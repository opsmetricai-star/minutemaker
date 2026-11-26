import { ChatBox } from "@/components/ChatBox";

export default function Ask() {
  return (
    <div>
      <h1 className="display text-4xl">Ask MinuteMaker</h1>
      <p className="mb-6 mt-1 text-muted">Questions are answered from your 8 most recent processed meetings. Pro plans and above only for cross-meeting search.</p>
      <ChatBox meetingId={null} />
    </div>
  );
}
