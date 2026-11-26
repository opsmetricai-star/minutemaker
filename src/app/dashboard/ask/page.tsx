import { ChatBox } from "@/components/ChatBox";

export default function Ask() {
  return (
    <div>
      <h1 className="display text-4xl">Ask MinuteMaker AI</h1>
      <p className="mb-6 mt-1 text-muted">MinuteMaker AI searches your eight most recent analyzed meetings and answers from the transcripts. Cross-meeting search is included on Pro and above.</p>
      <ChatBox meetingId={null} />
    </div>
  );
}
