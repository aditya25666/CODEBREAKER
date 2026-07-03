// src/components/WinLoseModal.jsx

export default function WinLoseModal({
  isOpen,
  won,
  secretCode,
  attemptsUsed,
  onPlayAgain,
  onChangeDifficulty,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8">

        {/* WIN SCREEN */}
        {won ? (
          <>
            <div className="text-center">

              <div className="text-6xl mb-4">
                🎉
              </div>

              <h2 className="text-4xl font-black text-green-500">
                CODE CRACKED!
              </h2>

              <p className="text-slate-400 mt-3">
                You successfully cracked the code.
              </p>

              <div className="mt-6 bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Secret Code
                </p>

                <h3 className="text-4xl font-bold text-white mt-2 tracking-widest">
                  {secretCode}
                </h3>
              </div>

              <div className="mt-4 bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Attempts Used
                </p>

                <h3 className="text-3xl font-bold text-yellow-400 mt-2">
                  {attemptsUsed}
                </h3>
              </div>

            </div>
          </>
        ) : (
          <>
            {/* LOSE SCREEN */}

            <div className="text-center">

              <div className="text-6xl mb-4">
                💀
              </div>

              <h2 className="text-4xl font-black text-red-500">
                GAME OVER
              </h2>

              <p className="text-slate-400 mt-3">
                You ran out of attempts or time.
              </p>

              <div className="mt-6 bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Secret Code Was
                </p>

                <h3 className="text-4xl font-bold text-white mt-2 tracking-widest">
                  {secretCode}
                </h3>
              </div>

            </div>
          </>
        )}

        {/* ACTION BUTTONS */}

        <div className="mt-8 flex flex-col gap-3">

          <button
            onClick={onPlayAgain}
            className="
              w-full
              py-3
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
              font-semibold
              transition
            "
          >
            🔄 Play Again
          </button>

          <button
            onClick={onChangeDifficulty}
            className="
              w-full
              py-3
              rounded-xl
              bg-slate-700
              hover:bg-slate-600
              text-white
              font-semibold
              transition
            "
          >
            🏠 Change Difficulty
          </button>

        </div>

      </div>
    </div>
  );
}