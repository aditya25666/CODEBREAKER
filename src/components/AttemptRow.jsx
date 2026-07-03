// src/components/AttemptRow.jsx

export default function AttemptRow({ guess, hints }) {
  return (
    <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700 rounded-xl p-3">
      
      {/* Guess Digits */}
      <div className="flex gap-2">
        {guess.split("").map((digit, index) => (
          <div
            key={index}
            className="
              w-12
              h-12
              rounded-lg
              border
              border-slate-600
              bg-slate-900
              flex
              items-center
              justify-center
              text-lg
              font-bold
              text-white
            "
          >
            {digit}
          </div>
        ))}
      </div>

      {/* Hint Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {hints.map((hint, index) => (
          <div
            key={index}
            className={`
              w-4
              h-4
              rounded-full
              border
              ${
                hint === "green"
                  ? "bg-green-500 border-green-300"
                  : hint === "yellow"
                  ? "bg-yellow-500 border-yellow-300"
                  : "bg-slate-500 border-slate-400"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}