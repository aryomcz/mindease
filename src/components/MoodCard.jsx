export default function MoodCard({ mood, onClick }) {
  return (
    <button
      onClick={() => onClick(mood)}
      className="bg-white p-6 rounded-xl shadow hover:shadow-md text-center transition cursor-pointer flex flex-col items-center"
    >
      <p className="text-5xl">{mood.icon}</p>
      <p className="mt-3 font-medium">{mood.label}</p>
    </button>
  );
}
