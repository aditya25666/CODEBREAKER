// src/components/StatsCard.jsx

export default function StatsCard({
  attemptsLeft,
  timeLeft,
  stats,
}) {
  const winRate =
    stats.gamesPlayed > 0
      ? Math.round(
          (stats.wins / stats.gamesPlayed) * 100
        )
      : 0;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">

      {/* Attempts Left */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <p className="text-slate-400 text-sm">
          Attempts Left
        </p>

        <h2 className="text-2xl font-bold text-white mt-1">
          {attemptsLeft}
        </h2>
      </div>

      {/* Timer */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <p className="text-slate-400 text-sm">
          Time Left
        </p>

        <h2 className="text-2xl font-bold text-white mt-1">
          {timeLeft}s
        </h2>
      </div>

      {/* Games Played */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <p className="text-slate-400 text-sm">
          Games Played
        </p>

        <h2 className="text-2xl font-bold text-white mt-1">
          {stats.gamesPlayed}
        </h2>
      </div>

      {/* Wins */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
        <p className="text-slate-400 text-sm">
          Wins
        </p>

        <h2 className="text-2xl font-bold text-green-500 mt-1">
          {stats.wins}
        </h2>
      </div>

      {/* Best Score */}
      <div className="col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-4">
        <div className="flex justify-between items-center">

          <div>
            <p className="text-slate-400 text-sm">
              Best Score
            </p>

            <h2 className="text-xl font-bold text-yellow-400 mt-1">
              {stats.bestScore
                ? `${stats.bestScore} Attempts`
                : "--"}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-slate-400 text-sm">
              Win Rate
            </p>

            <h2 className="text-xl font-bold text-cyan-400 mt-1">
              {winRate}%
            </h2>
          </div>

        </div>
      </div>

    </div>
  );
}