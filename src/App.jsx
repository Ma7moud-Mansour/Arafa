import { useState, useEffect, useRef, useCallback } from "react";
import {
  Home,
  BookOpen,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Check,
  CheckCircle2,
  Copy,
  X,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Heart,
  Users,
  Globe,
  Star,
  Layers,
  ChevronDown,
  Moon,
  AlertCircle,
} from "lucide-react";
import {
  scheduleItems,
  azkarItems,
  duaCategories,
  duaItems,
} from "./data.js";

// ─── Icon Map ───────────────────────────────────────────────
const iconMap = {
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Heart,
  Users,
  Globe,
  Star,
  Layers,
  Sparkles,
};

// ─── Toast Component ────────────────────────────────────────
function Toast({ message, type = "success", visible, onClose }) {
  const isSuccess = type === "success";
  return (
    <div
      className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl max-w-sm w-max ${
          isSuccess
            ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
            : "bg-amber-950/90 border-amber-500/30 text-amber-200"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle size={20} className="text-amber-400 shrink-0" />
        )}
        <span className="text-sm font-semibold leading-relaxed">{message}</span>
        <button onClick={onClose} className="mr-2 opacity-50 hover:opacity-100 transition-opacity p-1">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Audio Player Component ─────────────────────────────────
// ─── Audio Player Component ─────────────────────────────────
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 👈 غيرنا الرابط الخارجي بالمسار المحلي المباشر من الجذور
    audioRef.current = new Audio("/takbeerat.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-800/70 to-slate-800 border border-slate-700/50 p-6 shadow-xl">
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-amber-400/40 twinkle" />
      <div className="absolute top-10 left-12 w-1.5 h-1.5 rounded-full bg-amber-300/30 twinkle" />
      <div className="absolute bottom-6 right-10 w-2 h-2 rounded-full bg-amber-400/30 twinkle" />

      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer-bg pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <Moon size={20} className="text-amber-300" />
              تكبيرات العيد
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              الله أكبر الله أكبر لا إله إلا الله
            </p>
          </div>
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl bg-slate-700/40 text-slate-300 hover:bg-slate-700 hover:text-amber-400 transition-all border border-slate-600/30"
            aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={togglePlay}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              isPlaying
                ? "bg-amber-500 text-slate-900 shadow-amber-500/20 hover:bg-amber-400 hover:scale-105 active:scale-95"
                : "bg-slate-700 text-amber-400 hover:bg-slate-600 border border-slate-600/50"
            }`}
            aria-label={isPlaying ? "إيقاف" : "تشغيل"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="mr-[-2px]" />}
          </button>

          {/* Audio wave visualization */}
          <div className="flex items-end gap-1.5 h-10 flex-1 px-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-gradient-to-t from-amber-500 to-amber-300 audio-wave-bar"
                    : "bg-slate-700"
                }`}
                style={{
                  height: isPlaying ? `${Math.random() * 60 + 40}%` : "15%",
                  animationDelay: `${i * 0.06}s`,
                  animationDuration: `${0.7 + Math.random() * 0.7}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Timeline Component ─────────────────────────────────────
function Timeline() {
  const [activeItems, setActiveItems] = useState(() => {
    const saved = localStorage.getItem("arafa-timeline");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("arafa-timeline", JSON.stringify(activeItems));
  }, [activeItems]);

  const toggleItem = (id) => {
    setActiveItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-2.5 border-r-4 border-amber-500 pr-3">
        <BookOpen size={22} className="text-amber-400" />
        برنامج يوم عرفة
      </h2>

      <div className="relative pr-1">
        {/* Vertical line adjustment */}
        <div className="absolute right-[23px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-amber-500/40 via-slate-700 to-transparent" />

        <div className="space-y-10">
          {scheduleItems.map((item) => {
            const isActive = activeItems[item.id];
            const Icon = iconMap[item.icon] || Sun;

            return (
              <div
                key={item.id}
                className="relative flex gap-4 cursor-pointer group select-none"
                onClick={() => toggleItem(item.id)}
              >
                {/* Timeline dot */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 border ${
                    isActive
                      ? "bg-amber-500 border-amber-400 text-slate-900 shadow-lg shadow-amber-500/20"
                      : "bg-slate-800 border-slate-700 text-slate-400 group-hover:border-amber-500/40"
                  }`}
                >
                  {isActive ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
                </div>

                {/* Content Box with solid paddings */}
                <div
                  className={`flex-1 p-6 rounded-2xl border transition-all duration-300 space-y-4 ${
                    isActive
                      ? "bg-amber-500/[0.02] border-amber-500/30 shadow-md"
                      : "bg-slate-800/40 border-slate-700/50 group-hover:border-slate-600/70 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold tracking-wider ${
                        isActive ? "text-amber-400" : "text-amber-500/70"
                      }`}
                    >
                      {item.time}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700/50">
                      {item.period}
                    </span>
                  </div>
                  <h3
                    className={`text-base font-bold transition-colors ${
                      isActive ? "text-amber-300" : "text-slate-200"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-loose font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Tab 1: Home & Schedule ─────────────────────────────────
function HomeTab() {
  return (
    <div className="space-y-10 pb-10">
      {/* Hero Header */}
      <div className="text-center pt-6 space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 shadow-sm">
          <Moon size={13} className="text-amber-400" />
          <span className="text-xs text-amber-400 font-bold">
            ٩ ذو الحجة ١٤٤٧ هـ
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-50 tracking-tight">يوم عرفة</h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto font-medium">
          خير يوم طلعت فيه الشمس — يوم المغفرة والعتق من النار
        </p>
      </div>

      {/* Takbeerat Audio Player */}
      <AudioPlayer />

      {/* Interactive Timeline */}
      <Timeline />
    </div>
  );
}

// ─── Zikr Card Component ────────────────────────────────────
function ZikrCard({ zikr }) {
  const storageKey = `arafa-zikr-${zikr.id}`;
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [animating, setAnimating] = useState(false);
  const isComplete = count >= zikr.target;
  const progress = Math.min((count / zikr.target) * 100, 100);

  useEffect(() => {
    localStorage.setItem(storageKey, count.toString());
  }, [count, storageKey]);

  const increment = () => {
    if (isComplete) return;
    setCount((c) => c + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);
  };

  const reset = (e) => {
    e.stopPropagation();
    setCount(0);
  };

  return (
    <div
      onClick={increment}
      className={`relative overflow-hidden rounded-3xl border p-8 transition-all duration-200 select-none space-y-6 ${
        animating ? "tap-animate" : ""
      } ${
        isComplete
          ? "bg-emerald-950/20 border-emerald-500/40 shadow-md"
          : "bg-slate-800/50 border-slate-700/60 hover:border-slate-600/80 active:scale-[0.99]"
      } cursor-pointer`}
    >
      {/* Category badge & Reset */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            isComplete
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/10"
          }`}
        >
          {zikr.category}
        </span>
        <button
          onClick={reset}
          className="p-2 rounded-xl bg-slate-700/40 text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition-all"
          aria-label="إعادة تعيين"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Zikr text */}
      <p className="text-lg font-bold text-slate-100 leading-loose text-right">
        {zikr.text}
      </p>

      {/* Source */}
      {zikr.source && (
        <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
          {zikr.source}
        </p>
      )}

      {/* Counter & Progress */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl font-black tabular-nums tracking-tight ${
                isComplete ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {count}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              / {zikr.target}
            </span>
          </div>
          {isComplete && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              ✓ مكتمل
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/30">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isComplete
                ? "bg-gradient-to-l from-emerald-400 to-emerald-500"
                : "bg-gradient-to-l from-amber-400 to-amber-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Tab 2: Azkar & Tasbeeh ─────────────────────────────────
function AzkarTab() {
  return (
    <div className="space-y-8 pb-10">
      <div className="text-center pt-6 space-y-2">
        <h1 className="text-2xl font-bold text-slate-50">
          الأذكار والمسبحة
        </h1>
        <p className="text-sm text-slate-400 font-medium">
          اضغط على أي بطاقة لزيادة العداد تلقائياً
        </p>
      </div>

      <div className="divide-y divide-slate-700/30 space-y-0">
        {azkarItems.map((zikr) => (
          <div key={zikr.id} className="py-8 first:pt-0 last:pb-0">
            <ZikrCard zikr={zikr} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Dua Card Component (FIXED WITH FLEXBOX TO PREVENT OVERLAP) ───
function DuaCard({ dua, isSelected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-start gap-5 rounded-2xl border p-7 transition-all duration-200 cursor-pointer select-none active:scale-[0.99] group ${
        isSelected
          ? "bg-amber-500/[0.03] border-amber-500/50 shadow-md"
          : "bg-slate-800/50 border-slate-700/60 hover:border-slate-600 shadow-sm"
      }`}
    >
      {/* Text area - flows beautifully to the right */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-slate-100 leading-loose text-right">
          {dua.text}
        </p>
      </div>

      {/* Selection indicator area - fixed on the left side, never overlaps */}
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 border shrink-0 mt-0.5 ${
          isSelected
            ? "bg-amber-500 border-amber-400 text-slate-900 shadow-md shadow-amber-500/10"
            : "bg-slate-900/60 border-slate-700 text-slate-500 group-hover:border-amber-500/30"
        }`}
      >
        {isSelected ? <Check size={16} strokeWidth={3} /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />}
      </div>
    </div>
  );
}

// ─── Tab 3: Dua Generator ───────────────────────────────────
function DuaTab() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDuas, setSelectedDuas] = useState(() => {
    const saved = localStorage.getItem("arafa-selected-duas");
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  useEffect(() => {
    localStorage.setItem("arafa-selected-duas", JSON.stringify(selectedDuas));
  }, [selectedDuas]);

  const filteredDuas =
    activeCategory === "all"
      ? duaItems
      : duaItems.filter((d) => d.category === activeCategory);

  const toggleDua = useCallback((id) => {
    setSelectedDuas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const copySelectedDuas = async () => {
    if (selectedDuas.length === 0) {
      showToast("لم تختر أي دعاء بعد!", "warning");
      return;
    }

    const selectedTexts = duaItems
      .filter((d) => selectedDuas.includes(d.id))
      .map((d, i) => `${i + 1}. ${d.text}`)
      .join("\n\n");

    const fullText = `🤲 أدعيتي المختارة ليوم عرفة:\n${"─".repeat(30)}\n\n${selectedTexts}\n\n${"─".repeat(30)}\nتقبل الله منّا ومنكم 🌙`;

    try {
      await navigator.clipboard.writeText(fullText);
      showToast("تم نسخ أدعيتك بنجاح ✨");
    } catch {
      showToast("تعذّر النسخ — حاول مرة أخرى", "warning");
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="text-center pt-6 space-y-2">
        <h1 className="text-2xl font-bold text-slate-50">
          مُولد الأدعية المخصص
        </h1>
        <p className="text-sm text-slate-400 font-medium">
          اختر أدعيتك المفضلة لتنسخها وتتضرع بها دفعة واحدة
        </p>
      </div>

      {/* Selected counter + copy container */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md -mx-5 px-5 py-4 border-b border-slate-800/60 shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Heart size={18} className="text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 block">
                قائمتك الدعائية
              </span>
              <span className="text-sm font-bold text-slate-200">
                المختارة: <span className="text-amber-400 font-black">{selectedDuas.length}</span>
              </span>
            </div>
          </div>
          <button
            onClick={copySelectedDuas}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              selectedDuas.length > 0
                ? "bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-md shadow-amber-500/10 active:scale-95"
                : "bg-slate-800 text-slate-500 border border-slate-700/60 cursor-default"
            }`}
          >
            <Copy size={14} />
            نسخ القائمة
          </button>
        </div>
      </div>

      {/* Category filters - fixed clipping and optimized margins */}
      <div className="flex gap-2.5 overflow-x-auto pb-4 pt-2 no-scrollbar -mx-5 px-5 select-none">
        {duaCategories.map((cat) => {
          const Icon = iconMap[cat.icon] || Layers;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                isActive
                  ? "bg-amber-500 text-slate-900 border-amber-400 shadow-sm"
                  : "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:border-slate-600 hover:text-slate-200"
              }`}
            >
              <Icon size={13} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Dua Cards with solid padding rhythms */}
      <div className="divide-y divide-slate-700/20 space-y-0 pt-3">
        {filteredDuas.map((dua) => (
          <div key={dua.id} className="py-4 first:pt-0 last:pb-0">
            <DuaCard
              dua={dua}
              isSelected={selectedDuas.includes(dua.id)}
              onToggle={() => toggleDua(dua.id)}
            />
          </div>
        ))}
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}

// ─── Navigation Tabs ────────────────────────────────────────
const tabs = [
  { id: "home", label: "الرئيسية", icon: Home },
  { id: "azkar", label: "الأذكار", icon: BookOpen },
  { id: "dua", label: "الأدعية", icon: Sparkles },
];

// ─── Main App ───────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "azkar":
        return <AzkarTab />;
      case "dua":
        return <DuaTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900" dir="rtl">
      {/* Constrained layout for a native, premium mobile app experience */}
      <main className="max-w-md mx-auto px-5 pt-6 pb-36">
        {renderTab()}
      </main>

      {/* Clean Bottom Navigation with proper hitboxes and safe areas */}
      <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-slate-800/80 bg-slate-900/95 backdrop-blur-lg shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))]">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex flex-col items-center gap-1.5 py-1 px-4 rounded-2xl transition-all duration-200 min-w-[68px] ${
                    isActive ? "text-amber-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      isActive ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" : "bg-transparent border border-transparent text-slate-400"
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-[11px] font-bold ${isActive ? "text-amber-400" : "text-slate-500"}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}