// src/components/DifficultyScreen.jsx

const difficulties = [
  {
    id: "easy",
    title: "Easy",
    digits: 4,
    attempts: 10,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    id: "medium",
    title: "Medium",
    digits: 5,
    attempts: 8,
    color: "bg-yellow-600 hover:bg-yellow-700",
  },
  {
    id: "hard",
    title: "Hard",
    digits: 6,
    attempts: 6,
    color: "bg-red-600 hover:bg-red-700",
  },
];

export default function DifficultyScreen({ onSelectDifficulty }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl font-black tracking-wider">
            CODE BREAKER
          </h1>

          <p className="text-green-500 mt-3 text-sm uppercase tracking-widest">
            Crack The Secret Code 🔐
          </p>
        </div>

        {/* Difficulty Buttons */}
        <div className="space-y-4">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.id}
              onClick={() =>
                onSelectDifficulty(difficulty.id)
              }
              className={`
                w-full
                rounded-xl
                p-5
                text-white
                transition-all
                duration-200
                shadow-lg
                ${difficulty.color}
              `}
            >
              <div className="text-2xl font-bold">
                {difficulty.title}
              </div>

              <div className="text-sm mt-1 opacity-90">
                {difficulty.digits} Digits •{" "}
                {difficulty.attempts} Attempts
              </div>
            </button>
          ))}
        </div>

        {/* Rules */}
        <div className="mt-8 border-t border-slate-700 pt-6">
          <h3 className="text-white font-semibold mb-3">
            How to Play
          </h3>

          <ul className="space-y-2 text-slate-400 text-sm">
            <li>🟢 Correct digit & correct position</li>
            <li>🟡 Correct digit but wrong position</li>
            <li>⚫ Digit not present in code</li>
            <li>Crack the code before attempts run out</li>
          </ul>
        </div>

      </div>
    </div>
  );
}