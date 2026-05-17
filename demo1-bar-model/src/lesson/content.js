export const LANGS = ["EN", "CN", "AR"];
const tx = (EN, CN, AR) => ({ EN, CN, AR });

export const UI = {
  EN: {
    brand: "MATHMIND",
    system: "STRUCTURAL THINKING SYSTEM",
    introTitle: "Meet Your MathMind Coach",
    introSubtitle: "Today we learn to turn word problems into visible structures.",
    start: "Start Session",
    hook: "Hook Challenge",
    diagnostic: "Entry Diagnostic",
    route: "Select Challenge",
    next: "Next",
    back: "Back",
    reveal: "Reveal Next Step",
    reset: "Reset",
    steps: "Visible Steps",
    studentTask: "Student Explains",
    formula: "Formula Summary",
    parent: "Parent Showcase",
    summary: "Today’s Learning Summary",
    homework: "Homework Assigned",
    map: "Learning Path Map",
    complete: "Complete",
    answerHidden: "Answer hidden. Explain first.",
    youAreHere: "YOU ARE HERE",
    demo: "Demo",
    guided: "Guided Practice",
    practice: "Student Practice",
    challenge: "Challenge",
    boss: "Boss Challenge",
    explainToParent: "Explain this step to your parent",
  },
  CN: {
    brand: "MATHMIND",
    system: "数学结构思维系统",
    introTitle: "认识你的 MathMind 老师",
    introSubtitle: "今天我们学习：把应用题变成看得见的结构。",
    start: "开始体验课",
    hook: "Hook 挑战",
    diagnostic: "进门测",
    route: "选择挑战",
    next: "下一步",
    back: "返回",
    reveal: "展示下一步",
    reset: "重置",
    steps: "可见步骤",
    studentTask: "学生讲解",
    formula: "公式总结",
    parent: "家长展示",
    summary: "今日学习总结",
    homework: "课后作业已布置",
    map: "学习路径图",
    complete: "完成",
    answerHidden: "答案隐藏，先讲思路。",
    youAreHere: "你在这里",
    demo: "示范",
    guided: "引导练习",
    practice: "学生练习",
    challenge: "挑战题",
    boss: "Boss挑战",
    explainToParent: "把这一步讲给家长听",
  },
  AR: {
    brand: "MATHMIND",
    system: "نظام التفكير البنيوي",
    introTitle: "تعرّف على مدرّب MathMind",
    introSubtitle: "اليوم نحول المسائل الكلامية إلى بنية مرئية.",
    start: "ابدأ الحصة",
    hook: "تحدي البداية",
    diagnostic: "تقييم الدخول",
    route: "اختر التحدي",
    next: "التالي",
    back: "رجوع",
    reveal: "أظهر الخطوة التالية",
    reset: "إعادة",
    steps: "الخطوات الظاهرة",
    studentTask: "شرح الطالب",
    formula: "ملخص القاعدة",
    parent: "عرض للوالدين",
    summary: "ملخص تعلم اليوم",
    homework: "تم تعيين الواجب",
    map: "خريطة التعلم",
    complete: "تم",
    answerHidden: "الإجابة مخفية. اشرح أولاً.",
    youAreHere: "أنت هنا",
    demo: "عرض",
    guided: "تدريب موجه",
    practice: "تدريب الطالب",
    challenge: "تحدي",
    boss: "تحدي قوي",
    explainToParent: "اشرح هذه الخطوة لوالديك",
  }
};

export const lesson = {
  title: tx("Bar Model Translator", "Bar Model Translator", "مترجم النماذج الشريطية"),
  subtitle: tx("See hidden structures inside word problems", "看见应用题里的隐藏结构", "اكتشف البنية المخفية داخل المسائل الكلامية"),
  durationSeconds: 25 * 60,
  hookSeconds: 10,
  hook: {
    prompt: tx(
      "Ali and Omar together have 27 apples. Ali has 5 more than Omar. How many apples does Omar have?",
      "Ali和Omar一共有27个苹果。Ali比Omar多5个。Omar有多少个？",
      "لدى علي وعمر 27 تفاحة معًا. علي لديه 5 أكثر من عمر. كم لدى عمر؟"
    )
  },
  diagnostic: [
    {
      prompt: tx("Sara has 8. Ali has 3 more. Ali has?", "Sara有8个，Ali多3个。Ali有多少？", "سارة لديها 8. علي لديه 3 أكثر. كم لدى علي؟"),
      options: { EN: ["8", "11", "5"], CN: ["8", "11", "5"], AR: ["8", "11", "5"] },
      correct: 1
    },
    {
      prompt: tx("Ahmed has 12. Mona has 5 fewer. Mona has?", "Ahmed有12个，Mona少5个。Mona有多少？", "أحمد لديه 12. منى لديها 5 أقل. كم لدى منى؟"),
      options: { EN: ["17", "7", "12"], CN: ["17", "7", "12"], AR: ["17", "7", "12"] },
      correct: 1
    },
    {
      prompt: tx("Ali and Omar together have 27. Ali has 5 more. Omar has?", "Ali和Omar一共有27个。Ali多5个。Omar有多少？", "علي وعمر لديهما 27 معًا. علي لديه 5 أكثر. كم لدى عمر؟"),
      options: { EN: ["11", "16", "22"], CN: ["11", "16", "22"], AR: ["11", "16", "22"] },
      correct: 0
    },
    {
      prompt: tx("Ali gives Omar 6. Now they are equal. Total is 48. Ali had?", "Ali给Omar 6个后两人一样多。总数48。Ali原来有多少？", "أعطى علي عمر 6. الآن تساويا. المجموع 48. كم كان لدى علي؟"),
      options: { EN: ["18", "24", "30"], CN: ["18", "24", "30"], AR: ["18", "24", "30"] },
      correct: 2
    }
  ],
  paths: {
    foundation: {
      label: tx("Foundation Repair", "基础补差", "تقوية الأساس"),
      description: tx("Use only when more/fewer is unclear. After repair, continue to Core.", "只用于补清 more/fewer。补完后继续进入核心挑战。", "لمن يحتاج توضيح أكثر/أقل، ثم ينتقل للمسار الرئيسي."),
      ability: tx("Difference awareness", "差值意识", "إدراك الفرق"),
      postPath: "route",
      problems: [
        {
          id: "f1",
          mode: "demo",
          type: "more",
          prompt: tx("Sara has 8 apples. Ali has 3 more. How many does Ali have?", "Sara有8个苹果，Ali比她多3个。Ali有多少个？", "لدى سارة 8 تفاحات. علي لديه 3 أكثر. كم لدى علي؟"),
          baseName: "Sara", targetName: "Ali", base: 8, diff: 3, answer: 11,
          reveal: [
            tx("Sara has 8.", "Sara有8个。", "سارة لديها 8."),
            tx("Ali first has the same 8.", "Ali先有同样的8。", "علي لديه نفس 8."),
            tx("Ali has 3 more. Add the extra part.", "Ali多3个，加上多出来的一段。", "علي لديه 3 أكثر. نضيف الجزء الزائد."),
            tx("8 + 3 = 11.", "8 + 3 = 11。", "8 + 3 = 11.")
          ],
          studentSay: tx("More is the extra part.", "more 是多出来的一段。", "الأكثر هو الجزء الإضافي.")
        },
        {
          id: "f2",
          mode: "guided",
          type: "fewer",
          prompt: tx("Ahmed has 12 candies. Mona has 5 fewer. How many does Mona have?", "Ahmed有12颗糖，Mona少5颗。Mona有多少颗？", "أحمد لديه 12 حلوى. منى لديها 5 أقل. كم لدى منى؟"),
          baseName: "Ahmed", targetName: "Mona", base: 12, diff: 5, answer: 7,
          reveal: [
            tx("Ahmed has 12.", "Ahmed有12颗。", "أحمد لديه 12."),
            tx("Mona starts from the same 12.", "Mona先从同样的12开始。", "تبدأ منى من نفس 12."),
            tx("Mona has 5 fewer. Shade the missing part.", "Mona少5颗，用虚线阴影表示少掉的部分。", "منى لديها 5 أقل. نُظلّل الجزء المفقود."),
            tx("12 - 5 = 7.", "12 - 5 = 7。", "12 - 5 = 7.")
          ],
          studentSay: tx("Fewer is a missing part, not an extra part.", "fewer 是少掉的一段，不是多出来的一段。", "الأقل هو جزء مفقود وليس زائدًا.")
        }
      ],
      formula: [
        tx("Bigger = Smaller + Difference", "较大数 = 较小数 + 差值", "الأكبر = الأصغر + الفرق"),
        tx("Smaller = Bigger - Difference", "较小数 = 较大数 - 差值", "الأصغر = الأكبر - الفرق")
      ],
      summary: {
        method: tx("Make more/fewer visible as extra or missing parts.", "把 more/fewer 变成看得见的多出/少掉部分。", "نجعل أكثر/أقل مرئيًا كجزء زائد أو مفقود."),
        curriculum: tx("Saudi G3-G4 comparison word problems.", "对应沙特 G3-G4 比较类应用题。", "يناسب مسائل المقارنة في G3-G4 بالسعودية.")
      }
    },
    core: {
      label: tx("Core Challenge", "核心挑战", "التحدي الرئيسي"),
      description: tx("Total + difference, multi-person, and transfer/equalization.", "总数+差值、多人关系、转移/相等。", "المجموع والفرق، العلاقات المتعددة، النقل/المساواة."),
      ability: tx("Relationship modeling", "关系建模能力", "نمذجة العلاقات"),
      postPath: "formula",
      problems: [
        {
          id: "c1",
          mode: "demo",
          type: "totalDiff",
          prompt: tx("Ali and Omar together have 27 apples. Ali has 5 more than Omar. How many apples does Omar have?", "Ali和Omar一共有27个苹果。Ali比Omar多5个。Omar有多少个？", "لدى علي وعمر 27 تفاحة معًا. علي لديه 5 أكثر من عمر. كم لدى عمر؟"),
          smallerName: "Omar", biggerName: "Ali", total: 27, diff: 5, smaller: 11, bigger: 16,
          reveal: [
            tx("Mark the total: 27.", "先标出总数：27。", "حدد المجموع: 27."),
            tx("Draw two equal hidden parts.", "画出两段相同的隐藏部分。", "ارسم جزأين متساويين مخفيين."),
            tx("Ali has 5 more. Add the extra part.", "Ali多5个，加上多出来的一段。", "علي لديه 5 أكثر. نضيف الجزء الزائد."),
            tx("Remove the extra 5: 27 - 5 = 22.", "先拿掉差值：27 - 5 = 22。", "نزيل الفرق: 27 - 5 = 22."),
            tx("Split 22 into two equal parts.", "把22平分成两份。", "نقسم 22 إلى جزأين متساويين."),
            tx("22 ÷ 2 = 11. Omar has 11.", "22 ÷ 2 = 11，Omar有11个。", "22 ÷ 2 = 11. لدى عمر 11.")
          ],
          studentSay: tx("Remove the difference first, then split.", "先减差值，再平分。", "نزيل الفرق أولاً ثم نقسم.")
        },
        {
          id: "c2",
          mode: "guided",
          type: "totalDiffFewer",
          prompt: tx("Sara and Mona together have 36 books. Sara has 6 fewer than Mona. How many books does Sara have?", "Sara和Mona一共有36本书。Sara比Mona少6本。Sara有多少本？", "سارة ومنى لديهما 36 كتابًا معًا. سارة لديها 6 أقل من منى. كم لدى سارة؟"),
          smallerName: "Sara", biggerName: "Mona", total: 36, diff: 6, smaller: 15, bigger: 21,
          reveal: [
            tx("Mark the total: 36.", "先标出总数：36。", "حدد المجموع: 36."),
            tx("Sara is the smaller part. Mona is the bigger part.", "Sara是较小的一段，Mona是较大的一段。", "سارة هي الجزء الأصغر ومنى الأكبر."),
            tx("Mona has 6 more than Sara.", "Mona比Sara多6本。", "منى لديها 6 أكثر من سارة."),
            tx("Remove 6: 36 - 6 = 30.", "拿掉差值：36 - 6 = 30。", "نزيل 6: 36 - 6 = 30."),
            tx("Split 30 into two equal parts.", "把30平分成两份。", "نقسم 30 إلى جزأين."),
            tx("30 ÷ 2 = 15. Sara has 15.", "30 ÷ 2 = 15，Sara有15本。", "30 ÷ 2 = 15. لدى سارة 15.")
          ],
          studentSay: tx("Fewer is language. The structure is still total plus difference.", "fewer只是语言变化，结构仍然是总数+差值。", "كلمة أقل لغوية فقط. البنية هي المجموع والفرق.")
        },
        {
          id: "c3",
          mode: "challenge",
          type: "multiPerson",
          prompt: tx("Ali, Omar, and Sara together have 66 apples. Ali has 5 more than Omar. Sara has 4 fewer than Omar. How many apples does Omar have?", "Ali、Omar、Sara一共有66个苹果。Ali比Omar多5个，Sara比Omar少4个。Omar有多少个？", "لدى علي وعمر وسارة 66 تفاحة معًا. علي لديه 5 أكثر من عمر. سارة لديها 4 أقل من عمر. كم لدى عمر؟"),
          baseName: "Omar", plusName: "Ali", minusName: "Sara", total: 66, plusDiff: 5, minusDiff: 4, base: 21, plus: 26, minus: 17,
          reveal: [
            tx("Mark the total: 66.", "先标出总数：66。", "حدد المجموع: 66."),
            tx("Choose Omar as the reference part.", "选择Omar作为基准量。", "اختر عمر كجزء مرجعي."),
            tx("Ali has the same part plus 5.", "Ali是同样的一段，再多5。", "علي لديه نفس الجزء زائد 5."),
            tx("Sara has the same part minus 4.", "Sara是同样的一段，少4。", "سارة لديها نفس الجزء ناقص 4."),
            tx("Net extra is +1. Remove it: 66 - 1 = 65.", "净多出来的是+1。先拿掉：66 - 1 = 65。", "الصافي +1. نزيله: 66 - 1 = 65."),
            tx("65 cannot be split by 3. Check the structure, then adjust data.", "65不能平分成3份。先检查结构，再判断题目数据。", "65 لا ينقسم على 3. افحص البنية ثم البيانات.")
          ],
          studentSay: tx("If the data is not clean, I can catch it by the model.", "如果数据不干净，我能用模型发现问题。", "إذا كانت البيانات غير مناسبة، أكتشف ذلك بالنموذج.")
        },
        {
          id: "c4",
          mode: "boss",
          type: "transferTotal",
          prompt: tx("Ali and Omar have 48 apples in total. Ali gives Omar 6 apples. Now they are equal. How many apples did Ali have originally?", "Ali和Omar一共有48个苹果。Ali给Omar 6个后两人一样多。Ali原来有多少个？", "لدى علي وعمر 48 تفاحة معًا. أعطى علي عمر 6 تفاحات. الآن تساويا. كم كان لدى علي في البداية؟"),
          total: 48, transfer: 6, afterEach: 24, aliBefore: 30, omarBefore: 18,
          reveal: [
            tx("Mark the total: 48.", "先标出总数：48。", "حدد المجموع: 48."),
            tx("After transfer, both are equal: 24 and 24.", "转移后两人相等：24和24。", "بعد النقل تساويا: 24 و24."),
            tx("Reverse the transfer: Ali gets 6 back.", "倒回去：Ali拿回6个。", "نعكس النقل: علي يسترجع 6."),
            tx("Ali originally had 24 + 6 = 30.", "Ali原来有 24 + 6 = 30。", "كان لدى علي 24 + 6 = 30.")
          ],
          studentSay: tx("For transfer problems, solve the final state first, then reverse.", "转移题先看最后状态，再倒回去。", "في مسائل النقل، نحل الحالة النهائية ثم نعكس.")
        }
      ],
      formula: [
        tx("Smaller = (Total - Difference) ÷ 2", "较小数 =（总数 - 差值）÷ 2", "الأصغر = (المجموع - الفرق) ÷ 2"),
        tx("Reference = (Total - Net Extra) ÷ Number of People", "基准量 =（总数 - 净多出部分）÷ 人数", "المرجع = (المجموع - الصافي الزائد) ÷ عدد الأشخاص"),
        tx("Transfer: solve the final equal state, then reverse", "转移题：先解最终相等状态，再倒回去", "النقل: نحل الحالة المتساوية ثم نعكس")
      ],
      summary: {
        method: tx("Bar Model: total, difference, reference amount, and reverse transfer.", "条形图建模：总数、差值、基准量、反向转移。", "النموذج الشريطي: المجموع، الفرق، المرجع، وعكس النقل."),
        curriculum: tx("Saudi G4-G6 word problems: comparison, total-and-difference, and multi-step reasoning.", "对应沙特 G4-G6 应用题：比较关系、总数差值、多步推理。", "يناسب مسائل G4-G6 في السعودية: المقارنة، المجموع والفرق، والاستدلال متعدد الخطوات.")
      }
    },
    advanced: {
      label: tx("Advanced Challenge", "拔高挑战", "تحدي متقدم"),
      description: tx("Multi-person, transfer, and reverse structure. No ratio in this demo.", "多人关系、转移、反向结构。本节不放倍数。", "علاقات متعددة، نقل، وبنية عكسية. لا توجد نسبة في هذا العرض."),
      ability: tx("Dynamic structure reasoning", "动态结构推理", "استدلال البنية الديناميكية"),
      postPath: "formula",
      problems: [
        {
          id: "a1",
          mode: "challenge",
          type: "multiPerson",
          prompt: tx("Ali, Omar, and Sara together have 73 cards. Ali has 8 more than Omar. Sara has 3 fewer than Omar. How many cards does Omar have?", "Ali、Omar、Sara一共有73张卡。Ali比Omar多8张，Sara比Omar少3张。Omar有多少张？", "لدى علي وعمر وسارة 73 بطاقة معًا. علي لديه 8 أكثر من عمر. سارة لديها 3 أقل من عمر. كم لدى عمر؟"),
          baseName: "Omar", plusName: "Ali", minusName: "Sara", total: 73, plusDiff: 8, minusDiff: 3, base: 22, plus: 30, minus: 19,
          reveal: [
            tx("Mark the total: 73.", "先标出总数：73。", "حدد المجموع: 73."),
            tx("Choose Omar as the reference part.", "选择Omar作为基准量。", "اختر عمر كمرجع."),
            tx("Ali has the same part plus 8.", "Ali是同样的一段，再多8。", "علي لديه نفس الجزء زائد 8."),
            tx("Sara has the same part minus 3.", "Sara是同样的一段，少3。", "سارة لديها نفس الجزء ناقص 3."),
            tx("Net extra is +5. Remove it: 73 - 5 = 68.", "净多出来的是+5。先拿掉：73 - 5 = 68。", "الصافي +5. نزيله: 73 - 5 = 68."),
            tx("68 is not divisible by 3. The model catches bad data.", "68不能平分成3份。模型帮我们发现题目数据不成立。", "68 لا ينقسم على 3. النموذج يكشف خلل البيانات.")
          ],
          studentSay: tx("Advanced modeling can also verify if the data makes sense.", "高阶建模也能检查题目数据是否合理。", "النمذجة المتقدمة تتحقق من صحة البيانات.")
        },
        {
          id: "a2",
          mode: "boss",
          type: "transferTotal",
          prompt: tx("Ali and Omar have 48 apples in total. Ali gives Omar 6 apples. Now they are equal. How many apples did Ali have originally?", "Ali和Omar一共有48个苹果。Ali给Omar 6个后两人一样多。Ali原来有多少个？", "لدى علي وعمر 48 تفاحة معًا. أعطى علي عمر 6 تفاحات. الآن تساويا. كم كان لدى علي في البداية؟"),
          total: 48, transfer: 6, afterEach: 24, aliBefore: 30, omarBefore: 18,
          reveal: [
            tx("Mark the total: 48.", "先标出总数：48。", "حدد المجموع: 48."),
            tx("After transfer, both are equal: 24 and 24.", "转移后两人相等：24和24。", "بعد النقل تساويا: 24 و24."),
            tx("Reverse the transfer: Ali gets 6 back.", "倒回去：Ali拿回6个。", "نعكس النقل: علي يسترجع 6."),
            tx("Ali originally had 30.", "Ali原来有30个。", "كان لدى علي 30.")
          ],
          studentSay: tx("Reverse thinking unlocks transfer problems.", "反向思维能解开转移题。", "التفكير العكسي يفتح مسائل النقل.")
        }
      ],
      formula: [
        tx("Reference = (Total - Net Extra) ÷ Number of People", "基准量 =（总数 - 净多出部分）÷ 人数", "المرجع = (المجموع - الصافي الزائد) ÷ عدد الأشخاص"),
        tx("Reverse Transfer = undo the final change", "反向转移 = 把最后的变化倒回去", "عكس النقل = إلغاء التغيير الأخير")
      ],
      summary: {
        method: tx("Advanced modeling: reference amount, net difference, and reverse transfer.", "高阶建模：基准量、净差值、反向转移。", "نمذجة متقدمة: المرجع، صافي الفرق، وعكس النقل."),
        curriculum: tx("Saudi G5-G7 multi-step word problems and early algebraic reasoning.", "对应沙特 G5-G7 多步应用题与早期代数推理。", "يناسب مسائل G5-G7 متعددة الخطوات والاستدلال الجبري المبكر.")
      }
    }
  },
  parentShowcase: [
    {
      title: tx("Round 1", "第1轮", "الجولة 1"),
      problem: {
        type: "more",
        prompt: tx("Sara has 8 apples. Ali has 3 more. How many does Ali have?", "Sara有8个苹果，Ali比她多3个。Ali有多少个？", "لدى سارة 8 تفاحات. علي لديه 3 أكثر. كم لدى علي؟"),
        baseName: "Sara", targetName: "Ali", base: 8, diff: 3, answer: 11,
        reveal: [
          tx("Show Sara's 8.", "先讲Sara的8个。", "اشرح 8 الخاصة بسارة."),
          tx("Ali has the same 8.", "再讲Ali也有同样的8。", "اشرح أن علي لديه نفس 8."),
          tx("The yellow part means 3 more.", "黄色部分表示多3个。", "الجزء الأصفر يعني 3 أكثر."),
          tx("So Ali has 11.", "所以Ali有11个。", "إذن لدى علي 11.")
        ]
      }
    },
    {
      title: tx("Round 2", "第2轮", "الجولة 2"),
      problem: {
        type: "totalDiff",
        prompt: tx("Ali and Omar together have 27 apples. Ali has 5 more than Omar. How many does Omar have?", "Ali和Omar一共有27个苹果。Ali比Omar多5个。Omar有多少个？", "لدى علي وعمر 27 تفاحة معًا. علي لديه 5 أكثر من عمر. كم لدى عمر؟"),
        smallerName: "Omar", biggerName: "Ali", total: 27, diff: 5, smaller: 11, bigger: 16,
        reveal: [
          tx("First show the total 27.", "先讲总数27。", "اشرح المجموع 27."),
          tx("Then show two same parts.", "再讲两段相同部分。", "اشرح الجزأين المتساويين."),
          tx("Ali has 5 more.", "Ali多5个。", "علي لديه 5 أكثر."),
          tx("Remove 5, then split.", "先减5，再平分。", "نزيل 5 ثم نقسم.")
        ]
      }
    },
    {
      title: tx("Round 3", "第3轮", "الجولة 3"),
      problem: {
        type: "multiPerson",
        prompt: tx("Ali, Omar, and Sara together have 66 apples. Ali has 5 more than Omar. Sara has 4 fewer than Omar. How many does Omar have?", "Ali、Omar、Sara一共有66个苹果。Ali比Omar多5个，Sara比Omar少4个。Omar有多少个？", "لدى علي وعمر وسارة 66 تفاحة معًا. علي لديه 5 أكثر من عمر. سارة لديها 4 أقل من عمر. كم لدى عمر؟"),
        baseName: "Omar", plusName: "Ali", minusName: "Sara", total: 66, plusDiff: 5, minusDiff: 4, base: 21, plus: 26, minus: 17,
        reveal: [
          tx("Choose Omar as reference.", "选择Omar作为基准量。", "اختر عمر كمرجع."),
          tx("Ali is reference plus 5.", "Ali是基准量多5。", "علي هو المرجع زائد 5."),
          tx("Sara is reference minus 4.", "Sara是基准量少4。", "سارة هي المرجع ناقص 4."),
          tx("Use net extra to solve.", "用净差值解题。", "استخدم صافي الفرق للحل.")
        ]
      }
    }
  ],
  homework: {
    title: tx("Homework Assigned", "课后作业已布置", "تم تعيين الواجب"),
    description: tx(
      "The practice link will be sent after class. It includes review, variations, challenge problems, and one bonus problem.",
      "课后会发送单独练习链接。里面包括复习题、变式题、挑战题和一道超纲题。",
      "سيتم إرسال رابط تدريب بعد الحصة. يتضمن مراجعة وتنوعات وتحديات وسؤالًا متقدمًا."
    )
  },
  learningMap: {
    current: "Bar Model Translator",
    tracks: [
      {
        name: tx("Foundation Number Sense", "基础数感", "حس الأعداد الأساسي"),
        nodes: [tx("Friendly Numbers", "友好数字", "الأعداد الصديقة"), tx("Round & Return", "凑整补偿", "التقريب والإرجاع"), tx("Speed Multiplication", "乘法速算", "ضرب سريع")]
      },
      {
        name: tx("Visual Modeling", "数形建模", "النمذجة البصرية"),
        nodes: [tx("Comparison Thinking", "比较关系", "تفكير المقارنة"), tx("Bar Model Translator", "条形图建模", "مترجم النموذج الشريطي"), tx("Multi-Person Modeling", "多人关系建模", "نمذجة متعددة الأشخاص")]
      },
      {
        name: tx("Dynamic Structure", "动态结构", "البنية الديناميكية"),
        nodes: [tx("Transfer / Equalization", "转移 / 相等", "النقل / المساواة"), tx("Reverse Thinking", "反向思维", "التفكير العكسي"), tx("Proof Intuition", "证明直觉", "حدس البرهان")]
      },
      {
        name: tx("Algebra Readiness", "代数前置", "الاستعداد للجبر"),
        nodes: [tx("Equation Balance", "方程天平", "توازن المعادلات"), tx("What is x?", "x是什么", "ما هو x؟"), tx("Algebra Starter", "代数入门", "مدخل الجبر")]
      }
    ]
  }
};
