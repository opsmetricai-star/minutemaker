-- MinuteMaker schema. Run in the Supabase SQL editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  plan text not null default 'basic' check (plan in ('basic','pro','business','scale')),
  plan_expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  source text not null default 'upload' check (source in ('upload','paste')),
  audio_path text,
  duration_seconds integer not null default 0,
  status text not null default 'processing' check (status in ('processing','ready','failed')),
  transcript text,
  summary text,
  key_points jsonb not null default '[]',
  action_items jsonb not null default '[]',
  error text,
  created_at timestamptz not null default now()
);
create index if not exists meetings_user_idx on public.meetings(user_id, created_at desc);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  meeting_id uuid references public.meetings(id) on delete cascade, -- null = across all meetings
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.payment_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('pro','business','scale')),
  reference text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.meetings enable row level security;
alter table public.chat_messages enable row level security;
alter table public.notifications enable row level security;
alter table public.payment_claims enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "own profile read" on public.profiles;
create policy "own profile read" on public.profiles for select using (auth.uid() = id);
-- users may change their name only; plan is changed by service role after verified payment
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;

drop policy if exists "own meetings all" on public.meetings;
create policy "own meetings all" on public.meetings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own chat all" on public.chat_messages;
create policy "own chat all" on public.chat_messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own notifications all" on public.notifications;
create policy "own notifications all" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "own claims read" on public.payment_claims;
create policy "own claims read" on public.payment_claims for select using (auth.uid() = user_id);
drop policy if exists "own claims insert" on public.payment_claims;
create policy "own claims insert" on public.payment_claims for insert with check (auth.uid() = user_id and status = 'pending');
-- contact_messages: no policies → only the service role (API route) can insert/read.

-- Create profile on signup
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.notifications (user_id, title, body)
  values (new.id, 'Welcome to MinuteMaker', 'Upload your first recording to get a summary and action items.');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Storage: private bucket, files under <user_id>/...
insert into storage.buckets (id, name, public) values ('recordings', 'recordings', false) on conflict do nothing;
drop policy if exists "recordings insert own" on storage.objects;
create policy "recordings insert own" on storage.objects for insert to authenticated
  with check (bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "recordings read own" on storage.objects;
create policy "recordings read own" on storage.objects for select to authenticated
  using (bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "recordings delete own" on storage.objects;
create policy "recordings delete own" on storage.objects for delete to authenticated
  using (bucket_id = 'recordings' and (storage.foldername(name))[1] = auth.uid()::text);

-- Table privileges (newer Supabase projects do not auto-grant). RLS still restricts rows.
grant usage on schema public to anon, authenticated, service_role;
grant all on all tables in schema public to service_role;
grant select on public.profiles to authenticated;
grant select, insert, update, delete on public.meetings, public.chat_messages, public.notifications to authenticated;
grant select, insert on public.payment_claims to authenticated;
grant update (full_name) on public.profiles to authenticated;
