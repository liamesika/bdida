'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
} from 'lucide-react';

export default function FunctionsSummaryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <Link href="/weeks" className="text-indigo-200 hover:text-white flex items-center gap-1 text-sm mb-2">
          <ArrowRight className="w-4 h-4" />
          חזרה לשבועות
        </Link>
        <h1 className="text-3xl font-bold mb-2">סיכום מלא: פונקציות</h1>
        <p className="text-indigo-100">הרצאות 5-6 + שיעורי בית 5</p>
      </div>

      {/* Table of Contents */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4">תוכן עניינים</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            { id: 'definitions', label: '1. הגדרות בסיסיות' },
            { id: 'injective', label: '2. פונקציה חח"ע (Injective)' },
            { id: 'surjective', label: '3. פונקציה על (Surjective)' },
            { id: 'bijective', label: '4. פונקציה חח"ע ועל (Bijective)' },
            { id: 'composition', label: '5. הרכבת פונקציות' },
            { id: 'inverse', label: '6. פונקציה הפוכה' },
            { id: 'examples', label: '7. דוגמאות מפורטות (שיעורי בית 5)' },
            { id: 'tips', label: '8. טיפים למבחן' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3 py-2 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Section 1: Definitions */}
      <section id="definitions" className="space-y-4">
        <SectionHeader number={1} title="הגדרות בסיסיות" color="blue" />

        <DefinitionCard
          title="פונקציה (Function)"
          content={`תהיינה A, B קבוצות לא ריקות.
f ⊆ A × B תקרא פונקציה מ-A ל-B אם לכל a ∈ A יש לכל היותר איבר אחד b ∈ B כך ש-(a,b) ∈ f.`}
          notation="f: A → B"
          onCopy={handleCopy}
          copiedId={copiedId}
          id="def-function"
        />

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">מושגים חשובים:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">תחום (Domain)</p>
              <p className="text-blue-700 text-sm">הקבוצה A - משם יוצאים</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-900">טווח (Codomain)</p>
              <p className="text-purple-700 text-sm">הקבוצה B - לשם מגיעים</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="font-medium text-green-900">תמונה (Image)</p>
              <p className="text-green-700 text-sm">אם f(a) = b אז b היא התמונה של a</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-900">מקור (Pre-image)</p>
              <p className="text-orange-700 text-sm">אם f(a) = b אז a הוא מקור של b</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Injective */}
      <section id="injective" className="space-y-4">
        <SectionHeader number={2} title='פונקציה חח"ע (Injective)' color="green" />

        <DefinitionCard
          title='חח"ע (חד-חד ערכית)'
          content={`f: A → B היא חח"ע אם לכל a₁, a₂ ∈ A:
f(a₁) = f(a₂) → a₁ = a₂

במילים: איברים שונים בתחום → תמונות שונות בטווח`}
          onCopy={handleCopy}
          copiedId={copiedId}
          id="def-injective"
        />

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            איך להוכיח חח"ע:
          </h3>
          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <p className="font-mono text-sm">1. יהיו a₁, a₂ ∈ A כך ש-f(a₁) = f(a₂)</p>
            <p className="font-mono text-sm">2. [עבודה אלגברית...]</p>
            <p className="font-mono text-sm">3. לכן a₁ = a₂ ✓</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            איך להפריך חח"ע:
          </h3>
          <div className="bg-red-50 p-4 rounded-lg space-y-2">
            <p className="font-mono text-sm">למצוא a₁ ≠ a₂ כך ש-f(a₁) = f(a₂)</p>
            <p className="text-sm text-red-700 mt-2">דוגמה: f(x) = x², אז f(2) = f(-2) = 4</p>
          </div>
        </div>
      </section>

      {/* Section 3: Surjective */}
      <section id="surjective" className="space-y-4">
        <SectionHeader number={3} title="פונקציה על (Surjective)" color="purple" />

        <DefinitionCard
          title="על (Surjective)"
          content={`f: A → B היא על אם לכל b ∈ B קיים a ∈ A כך ש-f(a) = b.

במילים: כל איבר בטווח הוא תמונה של לפחות איבר אחד מהתחום`}
          onCopy={handleCopy}
          copiedId={copiedId}
          id="def-surjective"
        />

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            איך להוכיח על:
          </h3>
          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <p className="font-mono text-sm">1. יהי b ∈ B</p>
            <p className="font-mono text-sm">2. נבחר a = [ביטוי שתלוי ב-b]</p>
            <p className="font-mono text-sm">3. נראה ש-a ∈ A</p>
            <p className="font-mono text-sm">4. נחשב: f(a) = ... = b ✓</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            איך להפריך על:
          </h3>
          <div className="bg-red-50 p-4 rounded-lg space-y-2">
            <p className="font-mono text-sm">למצוא b ∈ B שאין לו מקור ב-A</p>
            <p className="text-sm text-red-700 mt-2">דוגמה: f: ℕ→ℕ, f(x) = x+1 אינה על כי ל-0 אין מקור</p>
          </div>
        </div>
      </section>

      {/* Section 4: Bijective */}
      <section id="bijective" className="space-y-4">
        <SectionHeader number={4} title='פונקציה חח"ע ועל (Bijective)' color="indigo" />

        <DefinitionCard
          title='חח"ע ועל (ביֶקצִיה)'
          content={`f: A → B היא חח"ע ועל אם היא גם חח"ע וגם על.

במילים: כל איבר בטווח הוא תמונה של בדיוק איבר אחד מהתחום`}
          onCopy={handleCopy}
          copiedId={copiedId}
          id="def-bijective"
        />

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <p className="text-indigo-900 font-medium">
            💡 פונקציה חח"ע ועל היא הפיכה - יש לה פונקציה הפוכה!
          </p>
        </div>
      </section>

      {/* Section 5: Composition */}
      <section id="composition" className="space-y-4">
        <SectionHeader number={5} title="הרכבת פונקציות" color="orange" />

        <DefinitionCard
          title="הרכבת פונקציות"
          content={`תהיינה f: A → B, g: B → C.
ההרכבה של g על f, אשר תסומן g ∘ f, היא פונקציה מ-A ל-C:

(g ∘ f)(x) = g(f(x))

שימו לב לכיוון! קודם f, אחר כך g`}
          notation="g ∘ f"
          onCopy={handleCopy}
          copiedId={copiedId}
          id="def-composition"
        />

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">דוגמה:</h3>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm space-y-1">
            <p>f(x) = x³ + 1</p>
            <p>g(x) = 2x + 5</p>
            <p className="pt-2 border-t border-gray-200 mt-2">(g ∘ f)(x) = g(f(x)) = g(x³+1) = 2(x³+1) + 5 = <span className="text-indigo-600 font-bold">2x³ + 7</span></p>
            <p>(f ∘ g)(x) = f(g(x)) = f(2x+5) = (2x+5)³ + 1 = <span className="text-purple-600 font-bold">8x³ + 60x² + 150x + 126</span></p>
          </div>
          <p className="text-amber-700 mt-3 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            שימו לב: g ∘ f ≠ f ∘ g בדרך כלל!
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">משפטים חשובים:</h3>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-900">הרכבת פונקציות חח"ע היא חח"ע</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-900">הרכבת פונקציות על היא על</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-900">הרכבה היא אסוציאטיבית: f ∘ (g ∘ h) = (f ∘ g) ∘ h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Inverse */}
      <section id="inverse" className="space-y-4">
        <SectionHeader number={6} title="פונקציה הפוכה" color="pink" />

        <DefinitionCard
          title="פונקציה הפוכה"
          content={`תהי f: A → B חח"ע ועל.
הפונקציה ההפוכה f⁻¹: B → A מוגדרת:

f⁻¹(b) = a  אם ורק אם  f(a) = b`}
          notation="f⁻¹"
          onCopy={handleCopy}
          copiedId={copiedId}
          id="def-inverse"
        />

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">תכונות:</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="p-3 bg-pink-50 rounded-lg">
              f⁻¹ ∘ f = i<sub>A</sub> (פונקציית הזהות על A)
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              f ∘ f⁻¹ = i<sub>B</sub> (פונקציית הזהות על B)
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Examples from HW5 */}
      <section id="examples" className="space-y-4">
        <SectionHeader number={7} title="דוגמאות מפורטות (שיעורי בית 5)" color="teal" />

        {/* Example 1 */}
        <ExampleCard
          title="דוגמה 1: f(A,B) = (A∖B, A∩B)"
          problem="f: P(ℕ)×P(ℕ) → P(ℕ)×P(ℕ)"
          isInjective={false}
          isSurjective={false}
          injectiveProof={`הפרכה:
f({1},{2}) = ({1}∖{2}, {1}∩{2}) = ({1}, ∅)
f({1},{3}) = ({1}∖{3}, {1}∩{3}) = ({1}, ∅)

קלטים שונים, אותה תוצאה!`}
          surjectiveProof={`הפרכה:
האם ({1},{1}) הוא תמונה?
צריך: A∖B = {1} ו-A∩B = {1}
• מ-A∖B = {1} → 1 ∉ B
• מ-A∩B = {1} → 1 ∈ B
סתירה!`}
        />

        {/* Example 2 */}
        <ExampleCard
          title="דוגמה 2: f(n) = ⌊√n⌋"
          problem="f: ℕ → ℕ (הטבעי הגדול ביותר ששורשו ≤ n)"
          isInjective={false}
          isSurjective={true}
          injectiveProof={`הפרכה:
f(9) = 3  (כי 3² = 9 ≤ 9, אבל 4² = 16 > 9)
f(10) = 3 (כי 3² = 9 ≤ 10, אבל 4² = 16 > 10)

9 ≠ 10 אבל f(9) = f(10)`}
          surjectiveProof={`הוכחה:
יהי b ∈ ℕ
נבחר a = b²
f(a) = f(b²) = b ✓

כי b הוא הטבעי הגדול ביותר ש-b² ≤ b²`}
        />

        {/* Example 3 */}
        <ExampleCard
          title="דוגמה 3: f(A) = A △ {1,2}"
          problem="f: P(ℕ) → P(ℕ) (הפרש סימטרי)"
          isInjective={true}
          isSurjective={true}
          injectiveProof={`הוכחה:
נניח f(A₁) = f(A₂)
כלומר: A₁ △ {1,2} = A₂ △ {1,2}

🔑 טריק: נפעיל △{1,2} על שני הצדדים!

(A₁ △ {1,2}) △ {1,2} = (A₂ △ {1,2}) △ {1,2}
A₁ △ ({1,2} △ {1,2}) = A₂ △ ({1,2} △ {1,2})
A₁ △ ∅ = A₂ △ ∅
A₁ = A₂ ✓`}
          surjectiveProof={`הוכחה:
יהי B ∈ P(ℕ)
נבחר A = B △ {1,2}

f(A) = (B △ {1,2}) △ {1,2}
     = B △ ({1,2} △ {1,2})
     = B △ ∅
     = B ✓`}
        />

        {/* Example 4: h(a,b) = (f(a), g(b)) */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="bg-teal-50 px-6 py-4 border-b border-teal-100">
            <h3 className="font-bold text-teal-900">דוגמה 4: h(a,b) = (f(a), g(b))</h3>
            <p className="text-teal-700 text-sm">f: A→C, g: B→D, h: A×B → C×D</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-900 mb-2">משפט:</p>
              <p className="text-purple-800">h חח"ע ⟺ f,g חח"ע</p>
              <p className="text-purple-800">h על ⟺ f,g על</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">רעיון ההוכחה (h חח"ע ← f,g חח"ע):</p>
              <div className="text-sm space-y-1">
                <p>• נניח h חח"ע, נוכיח g חח"ע</p>
                <p>• יהיו b₁, b₂ ∈ B כך ש-g(b₁) = g(b₂)</p>
                <p>• A לא ריקה → קיים a ∈ A</p>
                <p>• h(a,b₁) = (f(a), g(b₁)) = (f(a), g(b₂)) = h(a,b₂)</p>
                <p>• h חח"ע → (a,b₁) = (a,b₂) → <strong>b₁ = b₂</strong> ✓</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Tips */}
      <section id="tips" className="space-y-4">
        <SectionHeader number={8} title="טיפים למבחן" color="amber" />

        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
          <div className="space-y-4">
            <TipItem emoji="1️⃣" text='חח"ע: תמיד להתחיל ב"יהיו a₁, a₂ כך ש-f(a₁)=f(a₂), נוכיח a₁=a₂"' />
            <TipItem emoji="2️⃣" text='על: תמיד להתחיל ב"יהי b∈B, נמצא a∈A כך ש-f(a)=b"' />
            <TipItem emoji="3️⃣" text="הפרכה: דוגמה נגדית אחת מספיקה!" />
            <TipItem emoji="4️⃣" text="הרכבה: לשים לב לכיוון! (g ∘ f)(x) = g(f(x)) - קודם f, אח״כ g" />
            <TipItem emoji="5️⃣" text="הפרש סימטרי: A △ A = ∅ ו-A △ ∅ = A" />
            <TipItem emoji="6️⃣" text="פונקציה הפוכה קיימת רק אם הפונקציה חח״ע ועל!" />
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4">📋 טבלת עזר מהירה</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-right font-semibold">תכונה</th>
                <th className="px-4 py-3 text-right font-semibold">הגדרה</th>
                <th className="px-4 py-3 text-right font-semibold">להוכיח</th>
                <th className="px-4 py-3 text-right font-semibold">להפריך</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 font-medium">חח"ע</td>
                <td className="px-4 py-3">f(a₁)=f(a₂) → a₁=a₂</td>
                <td className="px-4 py-3">נניח f(a₁)=f(a₂), נראה a₁=a₂</td>
                <td className="px-4 py-3">מצא a₁≠a₂ עם f(a₁)=f(a₂)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">על</td>
                <td className="px-4 py-3">∀b∈B ∃a∈A: f(a)=b</td>
                <td className="px-4 py-3">יהי b, מצא a כך ש-f(a)=b</td>
                <td className="px-4 py-3">מצא b בלי מקור</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ number, title, color }: { number: number; title: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    indigo: 'from-indigo-600 to-indigo-700',
    orange: 'from-orange-600 to-orange-700',
    pink: 'from-pink-600 to-pink-700',
    teal: 'from-teal-600 to-teal-700',
    amber: 'from-amber-600 to-amber-700',
  };

  return (
    <div className={`bg-gradient-to-l ${colors[color]} rounded-xl px-6 py-4 text-white`}>
      <h2 className="text-xl font-bold">{number}. {title}</h2>
    </div>
  );
}

function DefinitionCard({
  title,
  content,
  notation,
  onCopy,
  copiedId,
  id,
}: {
  title: string;
  content: string;
  notation?: string;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
  id: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
      <div className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-blue-900">{title}</h3>
        </div>
        <button
          onClick={() => onCopy(content, id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-blue-100 rounded"
        >
          {copiedId === id ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-blue-600" />
          )}
        </button>
      </div>
      <div className="p-6">
        <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">{content}</pre>
        {notation && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-gray-500 text-sm">סימון: </span>
            <code className="px-2 py-1 bg-gray-100 rounded text-gray-800">{notation}</code>
          </div>
        )}
      </div>
    </div>
  );
}

function ExampleCard({
  title,
  problem,
  isInjective,
  isSurjective,
  injectiveProof,
  surjectiveProof,
}: {
  title: string;
  problem: string;
  isInjective: boolean;
  isSurjective: boolean;
  injectiveProof: string;
  surjectiveProof: string;
}) {
  const [showInjective, setShowInjective] = useState(false);
  const [showSurjective, setShowSurjective] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-teal-50 px-6 py-4 border-b border-teal-100">
        <h3 className="font-bold text-teal-900">{title}</h3>
        <p className="text-teal-700 text-sm font-mono">{problem}</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex gap-4">
          <div className={`flex-1 p-3 rounded-lg ${isInjective ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2">
              {isInjective ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={isInjective ? 'text-green-800' : 'text-red-800'}>
                {isInjective ? 'חח"ע' : 'לא חח"ע'}
              </span>
            </div>
          </div>
          <div className={`flex-1 p-3 rounded-lg ${isSurjective ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2">
              {isSurjective ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={isSurjective ? 'text-green-800' : 'text-red-800'}>
                {isSurjective ? 'על' : 'לא על'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => setShowInjective(!showInjective)}
            className="text-sm text-teal-600 hover:text-teal-800"
          >
            {showInjective ? '▼ הסתר' : '▶ הצג'} {isInjective ? 'הוכחה' : 'הפרכה'} לחח"ע
          </button>
          {showInjective && (
            <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-sm whitespace-pre-wrap font-mono">
              {injectiveProof}
            </pre>
          )}
        </div>

        <div>
          <button
            onClick={() => setShowSurjective(!showSurjective)}
            className="text-sm text-teal-600 hover:text-teal-800"
          >
            {showSurjective ? '▼ הסתר' : '▶ הצג'} {isSurjective ? 'הוכחה' : 'הפרכה'} לעל
          </button>
          {showSurjective && (
            <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-sm whitespace-pre-wrap font-mono">
              {surjectiveProof}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

function TipItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl">{emoji}</span>
      <p className="text-amber-900">{text}</p>
    </div>
  );
}
