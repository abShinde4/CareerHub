export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-md shadow-md shadow-primary-600/20'
            : 'glass dark:glass-dark text-gray-800 dark:text-gray-200 rounded-bl-md border border-white/30 dark:border-white/10'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
