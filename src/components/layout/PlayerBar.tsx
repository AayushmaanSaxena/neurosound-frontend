// This is the bottom music player bar
// It will be empty for now — we fill it with real functionality in Week 5

const PlayerBar = () => {
    return (
        <div className="h-20 bg-ns-dark border-t border-ns-card flex items-center px-4">

            {/* Left — current song info */}
            <div className="flex items-center gap-3 w-1/3">
                <div className="w-12 h-12 bg-ns-card rounded flex items-center justify-center">
                    <span className="text-ns-gray text-xl">🎵</span>
                </div>
                <div>
                    <p className="text-ns-white text-sm font-medium">
                        No song playing
                    </p>
                    <p className="text-ns-gray text-xs">
                        Select a song to play
                    </p>
                </div>
            </div>

            {/* Center — player controls */}
            <div className="flex flex-col items-center w-1/3 gap-2">
                <div className="flex items-center gap-6">
                    <button className="text-ns-gray hover:text-ns-white transition-colors text-lg">
                        ⏮
                    </button>
                    <button className="w-8 h-8 bg-ns-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                        <span className="text-ns-black text-sm">▶</span>
                    </button>
                    <button className="text-ns-gray hover:text-ns-white transition-colors text-lg">
                        ⏭
                    </button>
                </div>
                {/* Progress bar */}
                <div className="w-full flex items-center gap-2">
                    <span className="text-ns-gray text-xs">0:00</span>
                    <div className="flex-1 h-1 bg-ns-card rounded-full">
                        <div className="w-0 h-full bg-ns-white rounded-full" />
                    </div>
                    <span className="text-ns-gray text-xs">0:00</span>
                </div>
            </div>

            {/* Right — volume */}
            <div className="flex items-center justify-end gap-2 w-1/3">
                <span className="text-ns-gray text-sm">🔊</span>
                <div className="w-24 h-1 bg-ns-card rounded-full">
                    <div className="w-3/4 h-full bg-ns-white rounded-full" />
                </div>
            </div>

        </div>
    )
}

export default PlayerBar