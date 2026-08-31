import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaOm,
  FaChevronUp, FaChevronDown, FaMusic, FaStepForward,
  FaStepBackward, FaListUl
} from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

const TRACKS_DATA = [
  {
    id: 1,
    titleBn: 'হরে কৃষ্ণ মহামন্ত্র নামসংকীর্তন',
    titleEn: 'Hare Krishna Mahamantra Kirtan',
    artistBn: 'শ্রীল ভক্তিবেদান্ত স্বামী প্রভুপাদ',
    artistEn: 'Srila Bhaktivedanta Swami Prabhupada',
    url: '/assets/audio/hare_krishna_kirtan.mp3',
  },
  {
    id: 2,
    titleBn: 'অচ্যুতম কেশবম কৃষ্ণ দামোদরম ভজন',
    titleEn: 'Achyutam Keshavam Krishna Bhajan',
    artistBn: 'শ্রী বৃন্দাবন ভক্তিসঙ্গীত সেবা',
    artistEn: 'Vrindavan Bhakti Sangeet',
    url: '/assets/audio/achyutam_keshavam.mp3',
  },
  {
    id: 3,
    titleBn: 'রাধে রাধে রাধে বরসানে ওয়ালী রাধে',
    titleEn: 'Radhe Radhe Barsane Wali Radhe',
    artistBn: 'শ্রী বরসানা ধাম মণ্ডল',
    artistEn: 'Shree Barsana Dham Bhajan',
    url: '/assets/audio/radhe_govinda_bhajan.mp3',
  },
  {
    id: 4,
    titleBn: 'শ্রীকৃষ্ণ গোবিন্দ হরে মুরারী ভজন',
    titleEn: 'Shree Krishna Govind Hare Murari',
    artistBn: 'মান্য অরোরা ও ভক্তিসঙ্গীত পরিষদ',
    artistEn: 'Maanya Arora Divine Chants',
    url: '/assets/audio/govind_bolo_hari_gopal.mp3',
  },
  {
    id: 5,
    titleBn: 'শ্রী শ্রী আরতি কুঞ্জবিহারী কি (নিত্য মঙ্গল আরতি)',
    titleEn: 'Aarti Kunj Bihari Ki (Mangala Aarti)',
    artistBn: 'মন্দির প্রধান পূজারী পরিষদ',
    artistEn: 'Temple Chief Priests',
    url: '/assets/audio/radha_krishna_aarti.mp3',
  },
  {
    id: 6,
    titleBn: 'মধুরাষ্টকম স্তোত্র (অধরম মধুরম)',
    titleEn: 'Madhurashtakam (Adharam Madhuram)',
    artistBn: 'শ্রী বল্লভাচার্য বৈদিক পরিষদ',
    artistEn: 'Vallabhacharya Vedic Choir',
    url: '/assets/audio/om_namo_bhagavate.mp3',
  },
  {
    id: 7,
    titleBn: 'শ্রীকৃষ্ণের দিব্য মধুর বাঁশির রাগ ও ধ্যান',
    titleEn: 'Krishna Divine Bamboo Flute (Bansuri Raga)',
    artistBn: 'দিব্য বাঁশরী সেবা',
    artistEn: 'Divine Indian Bansuri Masters',
    url: '/assets/audio/krishna_flute_meditation.mp3',
  },
]

export default function FloatingAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef(null)
  const isPlayingRef = useRef(false)
  const { language } = useLanguage()

  const currentTrack = TRACKS_DATA[currentTrackIndex]

  // Keep volume in sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Track isPlaying in ref for event handlers
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  const safePlay = useCallback(() => {
    if (!audioRef.current) return
    const promise = audioRef.current.play()
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.warn('Audio play request interrupted or requires user gesture:', err.message)
          setIsPlaying(false)
        })
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      safePlay()
    }
  }

  const changeTrack = (idx, shouldPlay = true) => {
    if (idx < 0) idx = TRACKS_DATA.length - 1
    if (idx >= TRACKS_DATA.length) idx = 0
    setCurrentTrackIndex(idx)
    setCurrentTime(0)

    if (audioRef.current) {
      audioRef.current.src = TRACKS_DATA[idx].url
      audioRef.current.load()
      if (shouldPlay || isPlaying) {
        safePlay()
      }
    }
  }

  const nextTrack = () => {
    changeTrack(currentTrackIndex + 1, isPlaying)
  }

  const prevTrack = () => {
    changeTrack(currentTrackIndex - 1, isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime || 0)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0)
    }
  }

  const handleSeek = (e) => {
    const seekTime = Number(e.target.value)
    setCurrentTime(seekTime)
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime
    }
  }

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <aside className="fixed bottom-6 left-6 z-40 font-poppins select-none" aria-label="Devotional Audio Player">
      {/* Native HTML5 Audio Element with Event Listeners */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => changeTrack(currentTrackIndex + 1, true)}
        onError={(e) => {
          console.warn('Audio element source error:', e)
          setIsPlaying(false)
        }}
      />

      {isMinimized ? (
        /* Floating Mini Bubble */
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-3 bg-temple-primary/95 text-white px-4 py-2.5 shadow-2xl border-2 border-temple-gold/60 backdrop-blur-md hover:bg-temple-accent transition-all cursor-pointer group"
          title={language === 'bn' ? 'শ্রীকৃষ্ণ ভজন অডিও রেডিও' : 'Temple Ambient Radio'}
        >
          <div className={`w-9 h-9 rounded-full bg-temple-accent group-hover:bg-temple-primary flex items-center justify-center text-temple-gold shadow-md ${isPlaying ? 'animate-spin' : ''}`}>
            <FaMusic className="text-xs" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-temple-gold font-bold uppercase tracking-wider block">
                {isPlaying ? (language === 'bn' ? 'চলছে • ভজন রেডিও' : 'Playing • Radio') : (language === 'bn' ? 'ভজন শুনুন' : 'Bhajan Radio')}
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-temple-gold animate-pulse h-full" />
                  <span className="w-0.5 bg-temple-gold animate-pulse h-2/3" />
                  <span className="w-0.5 bg-temple-gold animate-pulse h-4/5" />
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-white truncate max-w-[130px] block">
              {language === 'bn' ? currentTrack.titleBn : currentTrack.titleEn}
            </span>
          </div>
          <FaChevronUp className="text-xs text-temple-gold ml-1" />
        </button>
      ) : (
        /* Expanded Interactive Player Card */
        <div className="w-84 sm:w-92 bg-temple-primary/98 text-white shadow-2xl border-t-4 border-temple-accent backdrop-blur-md p-4 animate-fadeIn border border-white/10 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <div className="flex items-center gap-2 text-temple-gold text-xs font-bold uppercase tracking-wider">
              <FaOm className="text-sm" />
              <span>{language === 'bn' ? 'মন্দির ভজন ও বাঁশির সুর' : 'Temple Ambient Player'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                  showPlaylist ? 'bg-temple-accent text-white' : 'text-white/70 hover:text-white'
                }`}
                title={language === 'bn' ? 'প্লেলিস্ট' : 'Playlist'}
              >
                <FaListUl className="text-xs" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/60 hover:text-white text-xs p-1 cursor-pointer"
                title={language === 'bn' ? 'ছোট করুন' : 'Minimize'}
              >
                <FaChevronDown />
              </button>
            </div>
          </div>

          {/* Current Track Card */}
          <div className="flex items-center gap-3 bg-black/40 p-3 border border-white/10">
            <div className={`w-11 h-11 bg-temple-accent flex items-center justify-center text-white text-lg shadow-md shrink-0 ${isPlaying ? 'animate-pulse' : ''}`}>
              <FaMusic />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate font-lora">
                {language === 'bn' ? currentTrack.titleBn : currentTrack.titleEn}
              </h4>
              <p className="text-[11px] text-temple-gold truncate mt-0.5">
                {language === 'bn' ? currentTrack.artistBn : currentTrack.artistEn}
              </p>
            </div>
          </div>

          {/* Progress / Seek Bar */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-temple-gold h-1.5 bg-white/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/60 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={prevTrack}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                title={language === 'bn' ? 'পূর্ববর্তী গান' : 'Previous Track'}
              >
                <FaStepBackward />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-temple-accent hover:bg-orange-700 text-white flex items-center justify-center text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
                title={isPlaying ? (language === 'bn' ? 'বিরতি দিন' : 'Pause') : (language === 'bn' ? 'গান শুনুন' : 'Play')}
              >
                {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
              </button>

              <button
                onClick={nextTrack}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                title={language === 'bn' ? 'পরবর্তী গান' : 'Next Track'}
              >
                <FaStepForward />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/70 hover:text-temple-gold text-xs cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value))
                  setIsMuted(false)
                }}
                className="w-16 sm:w-20 accent-temple-gold h-1 bg-white/20 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Expandable Playlist */}
          {showPlaylist && (
            <div className="space-y-1 pt-2 border-t border-white/10 text-[11px] max-h-48 overflow-y-auto">
              {TRACKS_DATA.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => changeTrack(idx, true)}
                  className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between rounded-xs transition-colors cursor-pointer ${
                    currentTrackIndex === idx
                      ? 'bg-temple-accent/50 text-temple-gold font-bold border-l-2 border-temple-gold'
                      : 'text-white/75 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{language === 'bn' ? t.titleBn : t.titleEn}</span>
                  {currentTrackIndex === idx && (
                    <span className="text-[10px] text-temple-gold font-mono ml-2 shrink-0">
                      {isPlaying ? '● LIVE' : 'PLAY'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
