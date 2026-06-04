import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Clock3, Home, RotateCcw, Star } from "lucide-react";
import VisualModel from "./components/VisualModel.jsx";
import { lesson, UI, LANGS } from "./lesson/content.js";

const tx = (obj, lang) => obj?.[lang] || obj?.EN || "";
const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;
const t3 = (EN, CN, AR) => ({ EN, CN, AR });

const NEW_UI = {
  EN: {
    parentLevelSelect: "Choose Parent Showcase Level",
    parentLevelHint: "The teacher can choose the level that matches today’s class.",
    levelResult: "Student Level Result",
    currentLevel: "Current Level",
    levelDetail: "Level Course Details",
    goal: "Stage Goal",
    lessons: "Lessons",
    lessonNo: "Lesson",
    topic: "Topic",
    curriculum: "Saudi Curriculum Link",
    grade: "Grade",
    skill: "Skill Type",
    method: "Method",
    ability: "Ability"
  },
  CN: {
    parentLevelSelect: "选择家长讲解等级",
    parentLevelHint: "老师可以根据本节课实际等级，选择让学生讲解哪一部分。",
    levelResult: "学生当前等级",
    currentLevel: "当前等级",
    levelDetail: "阶段课程详情",
    goal: "阶段目标",
    lessons: "课时",
    lessonNo: "课次",
    topic: "主题",
    curriculum: "对应沙特教材内容",
    grade: "年级",
    skill: "能力类型",
    method: "方法",
    ability: "能力"
  },
  AR: {
    parentLevelSelect: "اختيار مستوى الشرح للوالدين",
    parentLevelHint: "يمكن للمعلم اختيار المستوى المناسب لما تم تدريسه اليوم.",
    levelResult: "مستوى الطالب الحالي",
    currentLevel: "المستوى الحالي",
    levelDetail: "تفاصيل دروس المرحلة",
    goal: "هدف المرحلة",
    lessons: "الدروس",
    lessonNo: "الدرس",
    topic: "الموضوع",
    curriculum: "المحتوى المرتبط بالمناهج السعودية",
    grade: "الصف",
    skill: "نوع المهارة",
    method: "الطريقة",
    ability: "المهارة"
  }
};

const LEVEL_ORDER = ["foundation", "builder", "thinker", "advanced"];

const LEVEL_CATALOG = {
  foundation: {
    number: "01",
    title: t3("Foundation", "Foundation 基础阶段", "مرحلة التأسيس"),
    short: t3("Foundation", "基础", "التأسيس"),
    range: "G1-G4",
    goal: t3("Build number sense, understand basic mathematical relationships, and develop confidence in mathematical expression.", "建立数感，理解基础数学关系，并提升数学表达的信心。", "بناء الحس العددي، وفهم العلاقات الرياضية الأساسية، وتنمية الثقة في التعبير الرياضي."),
    slogan: t3("Build understanding", "建立理解", "نبني الفهم"),
    lessons: [
      ["F1", t3("Friendly Numbers", "友好数字", "الأعداد الصديقة"), t3("Numbers up to 20", "20以内的数", "الأعداد حتى 20"), "G1-G2", t3("Number sense", "数感", "الحس العددي")],
      ["F2", t3("Making Ten", "凑十", "تكوين العشرة"), t3("Basic addition strategies", "基础加法策略", "استراتيجيات الجمع الأساسية"), "G1-G2", t3("Number sense", "数感", "الحس العددي")],
      ["F3", t3("Round Then Compensate", "先凑整再补偿", "التقريب ثم التعويض"), t3("Addition and subtraction", "加法与减法", "الجمع والطرح"), "G2-G3", t3("Flexible thinking", "灵活思维", "التفكير المرن")],
      ["F4", t3("Jumping on the Number Line", "数轴跳跃", "القفز على خط الأعداد"), t3("Number line, addition and subtraction", "数轴与加减法", "خط الأعداد والجمع والطرح"), "G2-G3", t3("Visual thinking", "视觉化思维", "التصور البصري")],
      ["F5", t3("Part and Whole 1", "部分与整体 1", "الجزء والكل (1)"), t3("Addition and number relationships", "加法与数量关系", "الجمع والعلاقات العددية"), "G1-G3", t3("Structural thinking", "结构思维", "التفكير البنائي")],
      ["F6", t3("Part and Whole 2", "部分与整体 2", "الجزء والكل (2)"), t3("Relationships between parts and whole", "部分与整体的关系", "العلاقات بين الأجزاء والكل"), "G2-G3", t3("Structural thinking", "结构思维", "التفكير البنائي")],
      ["F7", t3("Comparison 1", "比较 1", "المقارنة (1)"), t3("Comparing quantities", "数量比较", "المقارنة بين الكميات"), "G3-G4", t3("Relational thinking", "关系思维", "التفكير العلاقي")],
      ["F8", t3("Comparison 2", "比较 2", "المقارنة (2)"), t3("Comparison word problems", "比较类应用题", "مسائل المقارنة"), "G3-G4", t3("Relational thinking", "关系思维", "التفكير العلاقي")],
      ["F9", t3("Basic Patterns", "基础规律", "الأنماط الأساسية"), t3("Patterns and algebra", "规律与代数", "الأنماط والجبر"), "G4", t3("Pattern discovery", "规律发现", "اكتشاف الأنماط")],
      ["F10", t3("Odd and Even", "奇数与偶数", "الفردي والزوجي"), t3("Number properties", "数的性质", "خصائص الأعداد"), "G3-G4", t3("Number structure", "数字结构", "فهم بنية الأعداد")],
      ["F11", t3("Geometric Sense", "几何感知", "الحس الهندسي"), t3("Geometric shapes", "几何图形", "الأشكال الهندسية"), "G1-G4", t3("Spatial thinking", "空间思维", "التفكير المكاني")],
      ["F12", t3("Area as Covering", "面积就是覆盖", "المساحة كعملية تغطية"), t3("Area concept", "面积概念", "مفهوم المساحة"), "G4-G5", t3("Spatial thinking", "空间思维", "التفكير المكاني")],
      ["F13", t3("Explain Why", "解释为什么", "اشرح لماذا"), t3("No separate textbook chapter", "教材中无独立章节", "لا يوجد فصل مستقل بالمناهج"), "—", t3("Mathematical expression", "数学表达", "التعبير الرياضي")],
      ["F14", t3("Two Ways to Solve", "两种解法", "طريقتان للحل"), t3("Problem-solving strategies", "解题策略", "استراتيجيات الحل"), "G3-G5", t3("Flexible thinking", "灵活思维", "التفكير المرن")],
      ["F15", t3("Word Problem Challenge", "应用题挑战", "تحدي المسألة الكلامية"), t3("Word problems", "文字应用题", "المسائل اللفظية"), "G3-G5", t3("Mathematical modeling", "数学建模", "النمذجة الرياضية")],
      ["F16", t3("Foundation Review", "基础阶段复习", "مراجعة مرحلة التأسيس"), t3("Full review", "综合复习", "مراجعة شاملة"), "—", t3("Stage assessment", "阶段评估", "التقييم المرحلي")]
    ]
  },
  builder: {
    number: "02",
    title: t3("Builder", "Builder 建设阶段", "مرحلة البناء"),
    short: t3("Builder", "建设", "البناء"),
    range: "G4-G6",
    goal: t3("Turn mathematical relationships into visual models and develop multi-step problem-solving skills.", "把数学关系转化为可视化模型，并发展多步骤解题能力。", "تحويل العلاقات الرياضية إلى نماذج بصرية، وتطوير مهارات حل المشكلات متعددة الخطوات."),
    slogan: t3("Connect and build", "连接并建立", "نربط ونبني"),
    lessons: [
      ["B1", t3("Introduction to Bar Models", "条形图模型入门", "مقدمة نماذج الأشرطة"), t3("Early algebra", "早期代数", "الجبر المبكر"), "G4-G5", t3("Mathematical modeling", "数学建模", "النمذجة الرياضية")],
      ["B2", t3("Comparison Model", "比较模型", "نموذج المقارنة"), t3("Quantitative comparison", "数量比较", "المقارنة الكمية"), "G4-G5", t3("Relational thinking", "关系思维", "التفكير العلاقي")],
      ["B3", t3("Reverse Comparison", "反向比较", "المقارنة العكسية"), t3("Comparison word problems", "比较应用题", "مسائل المقارنة"), "G4-G5", t3("Mathematical reasoning", "数学推理", "الاستدلال الرياضي")],
      ["B4", t3("Multi-Step Models 1", "多步模型 1", "النماذج متعددة الخطوات (1)"), t3("Composite problems", "复合问题", "المسائل المركبة"), "G5-G6", t3("Problem solving", "解决问题", "حل المشكلات")],
      ["B5", t3("Multi-Step Models 2", "多步模型 2", "النماذج متعددة الخطوات (2)"), t3("Composite problems", "复合问题", "المسائل المركبة"), "G5-G6", t3("Problem solving", "解决问题", "حل المشكلات")],
      ["B6", t3("Transfer Model", "转移模型", "نموذج التحويل"), t3("No standalone unit", "无独立单元", "غير موجود كوحدة مستقلة"), "—", t3("Analytical thinking", "分析思维", "التفكير التحليلي")],
      ["B7", t3("Balancing Model", "平衡模型", "نموذج الموازنة"), t3("No standalone unit", "无独立单元", "غير موجود كوحدة مستقلة"), "—", t3("Algebraic thinking", "代数思维", "التفكير الجبري")],
      ["B8", t3("Assumption Thinking 1", "假设思维 1", "التفكير بالافتراض (1)"), t3("Math enrichment", "数学拓展", "إثراء رياضي"), "—", t3("Logical reasoning", "逻辑推理", "الاستدلال المنطقي")],
      ["B9", t3("Assumption Thinking 2", "假设思维 2", "التفكير بالافتراض (2)"), t3("Math enrichment", "数学拓展", "إثراء رياضي"), "—", t3("Logical reasoning", "逻辑推理", "الاستدلال المنطقي")],
      ["B10", t3("Area Model for Multiplication", "乘法面积模型", "نموذج المساحة للضرب"), t3("Multiplication", "乘法", "الضرب"), "G4-G5", t3("Visual modeling", "视觉建模", "النمذجة البصرية")],
      ["B11", t3("Distributive Property", "分配律", "الخاصية التوزيعية"), t3("Early algebra", "早期代数", "الجبر المبكر"), "G5-G6", t3("Algebraic thinking", "代数思维", "التفكير الجبري")],
      ["B12", t3("Factor Tree", "因数树", "شجرة العوامل"), t3("Number analysis", "数字分解", "تحليل الأعداد"), "G6", t3("Number structure", "数的结构", "بنية الأعداد")],
      ["B13", t3("Square Numbers", "平方数", "الأعداد المربعة"), t3("Number patterns", "数字规律", "الأنماط العددية"), "G5-G6", t3("Pattern discovery", "规律发现", "اكتشاف الأنماط")],
      ["B14", t3("Pattern Inside Pattern", "规律中的规律", "نمط داخل نمط"), t3("Patterns and algebra", "规律与代数", "الأنماط والجبر"), "G6", t3("Pattern discovery", "规律发现", "اكتشاف الأنماط")],
      ["B15", t3("Intro to Logic Tables", "逻辑表入门", "مقدمة الجداول المنطقية"), t3("Math enrichment", "数学拓展", "إثراء رياضي"), "—", t3("Logical thinking", "逻辑思维", "التفكير المنطقي")],
      ["B16", t3("Intro to Truth and Lies", "真假话入门", "مقدمة الصدق والكذب"), t3("Math enrichment", "数学拓展", "إثراء رياضي"), "—", t3("Logical reasoning", "逻辑推理", "الاستدلال المنطقي")],
      ["B17", t3("Venn Diagram", "韦恩图", "مخطط فن"), t3("Sets and statistics", "集合与统计", "المجموعات والإحصاء"), "G6-G7", t3("Information organization", "信息整理", "تنظيم المعلومات")],
      ["B18", t3("Decomposing Shapes", "图形拆分", "تفكيك الأشكال الهندسية"), t3("Area", "面积", "المساحة"), "G7-G8", t3("Spatial thinking", "空间思维", "التفكير المكاني")],
      ["B19", t3("Strategy Comparison", "策略比较", "مقارنة الاستراتيجيات"), t3("Problem solving", "解决问题", "حل المشكلات"), "G5-G8", t3("Strategic thinking", "策略思维", "التفكير الاستراتيجي")],
      ["B20", t3("Builder Review", "建设阶段复习", "مراجعة مرحلة البناء"), t3("Full review", "综合复习", "مراجعة شاملة"), "—", t3("Stage assessment", "阶段评估", "التقييم المرحلي")]
    ]
  },
  thinker: {
    number: "03",
    title: t3("Thinker", "Thinker 深度思考阶段", "مرحلة التفكير العميق"),
    short: t3("Thinker", "深度思考", "التفكير العميق"),
    range: "G5-G9",
    goal: t3("Move from visual models to algebra, variables, functions, and ratios.", "从视觉模型过渡到代数、变量、函数和比例。", "الانتقال من النماذج البصرية إلى الجبر، والمتغيرات، والدوال، والنسب."),
    slogan: t3("Think deeper", "深入思考", "نفكر بعمق"),
    lessons: [
      ["T1", t3("Hidden Number", "隐藏的数", "العدد المخفي"), t3("Early equations", "早期方程", "المعادلات المبكرة"), "G5-G6", t3("Algebraic thinking", "代数思维", "التفكير الجبري")],
      ["T2", t3("What is x?", "x是什么？", "ما هو x؟"), t3("Equations", "方程", "المعادلات"), "G5-G6", t3("Algebraic thinking", "代数思维", "التفكير الجبري")],
      ["T3", t3("Balance Scale", "平衡天平", "ميزان التوازن"), t3("Equations", "方程", "المعادلات"), "G5-G6", t3("Equation understanding", "方程理解", "فهم المعادلات")],
      ["T4", t3("Two-Step Equations", "两步方程", "المعادلات ذات الخطوتين"), t3("Equations", "方程", "المعادلات"), "G6-G7", t3("Equation solving", "解方程", "حل المعادلات")],
      ["T5", t3("From Model to Equation", "从模型到方程", "من النموذج إلى المعادلة"), t3("Algebraic expressions", "代数表达式", "التعبيرات الجبرية"), "G5-G6", t3("Algebraic modeling", "代数建模", "النمذجة الجبرية")],
      ["T6", t3("Variable Relationships", "变量关系", "العلاقات بين المتغيرات"), t3("Algebra", "代数", "الجبر"), "G6-G7", t3("Algebraic thinking", "代数思维", "التفكير الجبري")],
      ["T7", t3("Function Machine 1", "函数机器 1", "آلة الدوال (1)"), t3("Functions", "函数", "الدوال"), "G6", t3("Functional thinking", "函数思维", "التفكير الوظيفي")],
      ["T8", t3("Function Machine 2", "函数机器 2", "آلة الدوال (2)"), t3("Functions", "函数", "الدوال"), "G6-G7", t3("Functional thinking", "函数思维", "التفكير الوظيفي")],
      ["T9", t3("Understanding Fractions 1", "理解分数 1", "فهم الكسور (1)"), t3("Fractions", "分数", "الكسور"), "G5-G6", t3("Fraction sense", "分数感", "الحس الكسري")],
      ["T10", t3("Understanding Fractions 2", "理解分数 2", "فهم الكسور (2)"), t3("Fractions", "分数", "الكسور"), "G5-G6", t3("Fraction sense", "分数感", "الحس الكسري")],
      ["T11", t3("Proportional Thinking", "比例思维", "التفكير النسبي"), t3("Ratio and proportion", "比与比例", "النسبة والتناسب"), "G6-G7", t3("Proportional thinking", "比例思维", "التفكير النسبي")],
      ["T12", t3("Meaning of Percentage", "百分比的意义", "معنى النسبة المئوية"), t3("Percentage applications", "百分比应用", "تطبيقات النسبة المئوية"), "G7", t3("Proportional thinking", "比例思维", "التفكير النسبي")],
      ["T13", t3("Rate Problems", "速率问题", "مسائل المعدل"), t3("Rates and proportion", "速率与比例", "المعدلات والتناسب"), "G7-G8", t3("Quantitative thinking", "数量思维", "التفكير الكمي")],
      ["T14", t3("Intro to Coordinates", "坐标入门", "مقدمة الإحداثيات"), t3("Linear functions", "一次函数", "الدوال الخطية"), "G7-G8", t3("Graphical thinking", "图像思维", "التفكير البياني")],
      ["T15", t3("Nets and Folding", "展开图与折叠", "الشبكات والطي"), t3("Solid geometry", "立体几何", "الهندسة الفراغية"), "G7-G8", t3("Spatial thinking", "空间思维", "التفكير المكاني")],
      ["T16", t3("Entry to Pythagoras", "勾股定理入门", "مدخل إلى فيثاغورس"), t3("Triangles", "三角形", "المثلثات"), "G9", t3("Geometric thinking", "几何思维", "التفكير الهندسي")],
      ["T17", t3("Counting Pairs", "配对计数", "عدّ الأزواج"), t3("Probability", "概率", "الاحتمالات"), "G7-G8", t3("Probabilistic thinking", "概率思维", "التفكير الاحتمالي")],
      ["T18", t3("Intro to Probability", "概率入门", "مقدمة الاحتمال"), t3("Probability", "概率", "الاحتمالات"), "G7-G9", t3("Probabilistic thinking", "概率思维", "التفكير الاحتمالي")],
      ["T19", t3("Spark of Proof", "证明的火花", "شرارة البرهان"), t3("No standalone chapter", "无独立章节", "لا يوجد فصل مستقل"), "—", t3("Deductive thinking", "推理证明", "التفكير الاستدلالي")],
      ["T20", t3("Thinker Review", "思考阶段复习", "مراجعة مرحلة التفكير"), t3("Full review", "综合复习", "مراجعة شاملة"), "—", t3("Stage assessment", "阶段评估", "التقييم المرحلي")]
    ]
  },
  advanced: {
    number: "04",
    title: t3("Advanced", "Advanced 卓越阶段", "مرحلة التميز"),
    short: t3("Advanced", "卓越", "التميز"),
    range: "G8-G12",
    goal: t3("Prepare students for advanced mathematical thinking, Qudurat, secondary mathematics, and non-routine problem solving.", "为高级数学思维、能力考试、高中数学和非套路问题解决做准备。", "إعداد الطالب للتفكير الرياضي المتقدم، والقدرات، والرياضيات الثانوية، وحل المشكلات غير الروتينية."),
    slogan: t3("Excel and create", "卓越与创造", "نتميز ونبدع"),
    lessons: [
      ["A1", t3("Difference of Squares", "平方差", "فرق المربعين"), t3("Factorization", "因式分解", "التحليل"), "G9", t3("Advanced algebra", "高阶代数", "الجبر المتقدم")],
      ["A2", t3("Advanced Difference of Squares", "高级平方差", "فرق المربعين المتقدم"), t3("Factorization", "因式分解", "التحليل"), "G9", t3("Advanced algebra", "高阶代数", "الجبر المتقدم")],
      ["A3", t3("Perfect Squares", "完全平方", "المربعات الكاملة"), t3("Quadratic equations", "二次方程", "المعادلات التربيعية"), "G9", t3("Advanced algebra", "高阶代数", "الجبر المتقدم")],
      ["A4", t3("Algebraic Identities", "代数恒等式", "المتطابقات الجبرية"), t3("Algebra", "代数", "الجبر"), "G9-G10", t3("Symbolic thinking", "符号思维", "التفكير الرمزي")],
      ["A5", t3("From Sequence to Rule", "从数列到规律", "من المتتالية إلى القانون"), t3("Functions and sequences", "函数与数列", "الدوال والمتتاليات"), "G8-G10", t3("Pattern discovery", "规律发现", "اكتشاف الأنماط")],
      ["A6", t3("Triangular Numbers", "三角数", "الأعداد المثلثية"), t3("Number patterns", "数字规律", "الأنماط العددية"), "G8-G10", t3("Structural thinking", "结构思维", "التفكير البنائي")],
      ["A7", t3("Intro to Fibonacci", "斐波那契入门", "مقدمة فيبوناتشي"), t3("Number patterns", "数字规律", "الأنماط العددية"), "G8-G10", t3("Pattern discovery", "规律发现", "اكتشاف الأنماط")],
      ["A8", t3("Advanced Logic Tables", "高级逻辑表", "الجداول المنطقية المتقدمة"), t3("Quantitative Qudurat", "能力考试数量推理", "القدرات الكمية"), "—", t3("Logical reasoning", "逻辑推理", "الاستدلال المنطقي")],
      ["A9", t3("Advanced Truth and Lies", "高级真假话", "الصدق والكذب المتقدم"), t3("Quantitative Qudurat", "能力考试数量推理", "القدرات الكمية"), "—", t3("Logical reasoning", "逻辑推理", "الاستدلال المنطقي")],
      ["A10", t3("Odd and Even Analysis", "奇偶分析", "تحليل الفردي والزوجي"), t3("Number structure", "数字结构", "بنية الأعداد"), "—", t3("Numerical thinking", "数字思维", "التفكير العددي")],
      ["A11", t3("Invariant Thinking", "不变量思维", "التفكير بالثوابت"), t3("Math enrichment", "数学拓展", "إثراء رياضي"), "—", t3("Problem solving", "解决问题", "حل المشكلات")],
      ["A12", t3("Advanced Invariant Thinking", "高级不变量思维", "التفكير بالثوابت (متقدم)"), t3("Math enrichment", "数学拓展", "إثراء رياضي"), "—", t3("Problem solving", "解决问题", "حل المشكلات")],
      ["A13", t3("Counting Principles", "计数原理", "مبادئ العد"), t3("Probability", "概率", "الاحتمالات"), "G8-G12", t3("Probabilistic thinking", "概率思维", "التفكير الاحتمالي")],
      ["A14", t3("Factorial", "阶乘", "العامل المضروب"), t3("Probability", "概率", "الاحتمالات"), "G10-G12", t3("Probabilistic thinking", "概率思维", "التفكير الاحتمالي")],
      ["A15", t3("Combinations", "组合", "التوافيق"), t3("Probability", "概率", "الاحتمالات"), "G10-G12", t3("Probabilistic thinking", "概率思维", "التفكير الاحتمالي")],
      ["A16", t3("Advanced Venn Diagram", "高级韦恩图", "مخطط فن المتقدم"), t3("Sets", "集合", "المجموعات"), "G10", t3("Information organization", "信息整理", "تنظيم المعلومات")],
      ["A17", t3("Geometric Probability", "几何概率", "الاحتمال الهندسي"), t3("Probability extension", "概率拓展", "امتداد الاحتمالات"), "G10-G12", t3("Probabilistic thinking", "概率思维", "التفكير الاحتمالي")],
      ["A18", t3("Proof by Area", "面积证明", "البرهان بالمساحة"), t3("Math enrichment", "数学拓展", "إثراء رياضي"), "—", t3("Geometric thinking", "几何思维", "التفكير الهندسي")],
      ["A19", t3("Coordinate Strategies", "坐标策略", "استراتيجيات الإحداثيات"), t3("Functions and geometry", "函数与几何", "الدوال والهندسة"), "G8-G12", t3("Analytical thinking", "分析思维", "التفكير التحليلي")],
      ["A20", t3("3D Volume Change", "三维体积变化", "التغير الحجمي ثلاثي الأبعاد"), t3("Volume and area", "体积与面积", "الحجم والمساحة"), "G8-G12", t3("Spatial thinking", "空间思维", "التفكير المكاني")],
      ["A21", t3("Fermi Estimates", "费米估算", "تقديرات فيرمي"), t3("Quantitative Qudurat", "能力考试数量推理", "القدرات الكمية"), "—", t3("Quantitative estimation", "数量估算", "التقدير الكمي")],
      ["A22", t3("Non-Routine Problems", "非套路问题", "المشكلات غير الروتينية"), t3("Quantitative Qudurat", "能力考试数量推理", "القدرات الكمية"), "—", t3("Problem solving", "解决问题", "حل المشكلات")],
      ["A23", t3("Strategy Creation", "创造策略", "ابتكار الاستراتيجيات"), t3("Metacognitive thinking", "元认知思维", "التفكير فوق المعرفي"), "—", t3("Strategic thinking", "策略思维", "التفكير الاستراتيجي")],
      ["A24", t3("Advanced Review", "卓越阶段复习", "مراجعة مرحلة التميز"), t3("Full review", "综合复习", "مراجعة شاملة"), "—", t3("Stage assessment", "阶段评估", "التقييم المرحلي")]
    ]
  }
};

const PATH_TO_LEVEL = {
  foundation: "foundation",
  core: "builder",
  advanced: "thinker"
};

const PARENT_LEVEL_TO_INDEX = {
  foundation: 0,
  builder: 1,
  thinker: 2,
  advanced: 2
};

function fixBadProblem(problem) {
  if (!problem) return problem;
  if (problem.type === "multiPerson" && problem.total === 66 && problem.plusDiff === 5 && problem.minusDiff === 4) {
    return {
      ...problem,
      prompt: t3(
        "Ali, Omar, and Sara together have 67 apples. Ali has 5 more than Omar. Sara has 4 fewer than Omar. How many apples does Omar have?",
        "Ali、Omar、Sara一共有67个苹果。Ali比Omar多5个，Sara比Omar少4个。Omar有多少个？",
        "لدى علي وعمر وسارة 67 تفاحة معًا. علي لديه 5 أكثر من عمر. سارة لديها 4 أقل من عمر. كم لدى عمر؟"
      ),
      total: 67,
      base: 22,
      plus: 27,
      minus: 18,
      reveal: [
        t3("Mark the total: 67.", "先标出总数：67。", "حدد المجموع: 67."),
        t3("Choose Omar as the reference part.", "选择Omar作为基准量。", "اختر عمر كجزء مرجعي."),
        t3("Ali has the same part plus 5.", "Ali是同样的一段，再多5。", "علي لديه نفس الجزء زائد 5."),
        t3("Sara has the same part minus 4.", "Sara是同样的一段，少4。", "سارة لديها نفس الجزء ناقص 4."),
        t3("Net extra is +1. Remove it: 67 - 1 = 66.", "净多出来的是+1。先拿掉：67 - 1 = 66。", "الصافي +1. نزيله: 67 - 1 = 66."),
        t3("66 ÷ 3 = 22. Omar has 22.", "66 ÷ 3 = 22，Omar有22个。", "66 ÷ 3 = 22. لدى عمر 22.")
      ],
      studentSay: t3("The model helps me find the reference amount first.", "模型帮我先找到基准量。", "يساعدني النموذج على إيجاد مقدار المرجع أولاً.")
    };
  }
  if (problem.type === "multiPerson" && problem.total === 73 && problem.plusDiff === 8 && problem.minusDiff === 3) {
    return {
      ...problem,
      prompt: t3(
        "Ali, Omar, and Sara together have 74 cards. Ali has 8 more than Omar. Sara has 3 fewer than Omar. How many cards does Omar have?",
        "Ali、Omar、Sara一共有74张卡。Ali比Omar多8张，Sara比Omar少3张。Omar有多少张？",
        "لدى علي وعمر وسارة 74 بطاقة معًا. علي لديه 8 أكثر من عمر. سارة لديها 3 أقل من عمر. كم لدى عمر؟"
      ),
      total: 74,
      base: 23,
      plus: 31,
      minus: 20,
      reveal: [
        t3("Mark the total: 74.", "先标出总数：74。", "حدد المجموع: 74."),
        t3("Choose Omar as the reference part.", "选择Omar作为基准量。", "اختر عمر كمرجع."),
        t3("Ali has the same part plus 8.", "Ali是同样的一段，再多8。", "علي لديه نفس الجزء زائد 8."),
        t3("Sara has the same part minus 3.", "Sara是同样的一段，少3。", "سارة لديها نفس الجزء ناقص 3."),
        t3("Net extra is +5. Remove it: 74 - 5 = 69.", "净多出来的是+5。先拿掉：74 - 5 = 69。", "الصافي +5. نزيله: 74 - 5 = 69."),
        t3("69 ÷ 3 = 23. Omar has 23.", "69 ÷ 3 = 23，Omar有23张。", "69 ÷ 3 = 23. لدى عمر 23.")
      ],
      studentSay: t3("Advanced modeling verifies the data and solves the structure.", "高阶建模先检查数据，再解决结构。", "النمذجة المتقدمة تتحقق من البيانات ثم تحل البنية.")
    };
  }
  return problem;
}

export default function App() {
  const [lang, setLang] = useState("AR");
  const [screen, setScreen] = useState("intro");
  const [sessionLeft, setSessionLeft] = useState(lesson.durationSeconds);
  const [hookLeft, setHookLeft] = useState(lesson.hookSeconds);
  const [diagIndex, setDiagIndex] = useState(0);
  const [diagScore, setDiagScore] = useState(0);
  const [pathId, setPathId] = useState("core");
  const [problemIndex, setProblemIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [parentIndex, setParentIndex] = useState(0);
  const [parentStep, setParentStep] = useState(0);
  const [lastMainPath, setLastMainPath] = useState("core");
  const [expandedLevel, setExpandedLevel] = useState("builder");

  const ui = { ...UI[lang], ...NEW_UI[lang] };
  const path = lesson.paths[pathId];
  const problem = fixBadProblem(path?.problems?.[problemIndex]);
  const resultLevel = PATH_TO_LEVEL[lastMainPath] || "builder";

  useEffect(() => {
    const timer = setInterval(() => setSessionLeft(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (screen !== "hook") return;
    setHookLeft(lesson.hookSeconds);
    const timer = setInterval(() => setHookLeft(v => Math.max(0, v - 1)), 1000);
    return () => clearInterval(timer);
  }, [screen]);

  function resetAll() {
    setScreen("intro");
    setSessionLeft(lesson.durationSeconds);
    setHookLeft(lesson.hookSeconds);
    setDiagIndex(0);
    setDiagScore(0);
    setPathId("core");
    setProblemIndex(0);
    setStep(0);
    setParentIndex(0);
    setParentStep(0);
    setLastMainPath("core");
    setExpandedLevel("builder");
  }

  function pickDiagnostic(i) {
    const d = lesson.diagnostic[diagIndex];
    const score = diagScore + (i === d.correct ? 1 : 0);
    setDiagScore(score);
    if (diagIndex < lesson.diagnostic.length - 1) {
      setDiagIndex(diagIndex + 1);
    } else {
      if (score <= 2) setPathId("foundation");
      else if (score >= 4) setPathId("advanced");
      else setPathId("core");
      setScreen("route");
    }
  }

  function startPath(id) {
    setPathId(id);
    if (id !== "foundation") setLastMainPath(id);
    setProblemIndex(0);
    setStep(0);
    setScreen("lesson");
  }

  function nextProblem() {
    if (problemIndex < path.problems.length - 1) {
      setProblemIndex(problemIndex + 1);
      setStep(0);
    } else {
      if (path.postPath === "route") {
        setScreen("route");
        setPathId(lastMainPath);
      } else {
        setScreen("formula");
      }
    }
  }

  function chooseParentLevel(levelKey) {
    setParentIndex(PARENT_LEVEL_TO_INDEX[levelKey] ?? 1);
    setParentStep(0);
    setScreen("parent");
  }

  return (
    <div className="app-shell">
      <div className="stage" dir={lang === "AR" ? "rtl" : "ltr"}>
        <header className="topbar">
          <div className="brand">
            <div className="logo">M</div>
            <div><div className="brand-title">{ui.brand}</div><div className="brand-subtitle">{ui.system}</div></div>
          </div>
          <div className="lang-switch">{LANGS.map(l => <button key={l} className={lang===l ? "active" : ""} onClick={() => setLang(l)}>{l}</button>)}</div>
        </header>

        <main className="main-area">
          {screen === "intro" && <Intro lang={lang} ui={ui} onNext={() => setScreen("hook")} />}
          {screen === "hook" && <Hook lang={lang} ui={ui} hookLeft={hookLeft} onNext={() => setScreen("diagnostic")} />}
          {screen === "diagnostic" && <Diagnostic lang={lang} ui={ui} index={diagIndex} onPick={pickDiagnostic} />}
          {screen === "route" && <Route lang={lang} ui={ui} recommended={pathId} onChoose={startPath} />}
          {screen === "lesson" && <Lesson lang={lang} ui={ui} problem={problem} step={step} setStep={setStep} onNext={nextProblem} sessionLeft={sessionLeft} />}
          {screen === "formula" && <Formula lang={lang} ui={ui} path={path} onNext={() => setScreen("parentLevelSelect")} />}
          {screen === "parentLevelSelect" && <ParentLevelSelect lang={lang} ui={ui} recommended={resultLevel} onChoose={chooseParentLevel} />}
          {screen === "parent" && <Parent lang={lang} ui={ui} index={parentIndex} setIndex={setParentIndex} step={parentStep} setStep={setParentStep} onNext={() => setScreen("summary")} />}
          {screen === "summary" && <Summary lang={lang} ui={ui} path={lesson.paths[lastMainPath]} onNext={() => setScreen("levelResult")} />}
          {screen === "levelResult" && <StudentLevel lang={lang} ui={ui} currentLevel={resultLevel} onNext={() => { setExpandedLevel(resultLevel); setScreen("levelDetail"); }} />}
          {screen === "levelDetail" && <LevelDetail lang={lang} ui={ui} expandedLevel={expandedLevel} setExpandedLevel={setExpandedLevel} onNext={() => setScreen("homework")} />}
          {screen === "homework" && <Homework lang={lang} ui={ui} onNext={() => setScreen("map")} />}
          {screen === "map" && <LearningMap lang={lang} ui={ui} onNext={resetAll} />}
        </main>

        <footer className="footerbar">
          <button className="secondary-btn" onClick={resetAll}><RotateCcw size={16} /> {ui.reset}</button>
          <div className="footer-time"><Clock3 size={16} /> {formatTime(sessionLeft)}</div>
        </footer>
      </div>
    </div>
  );
}

function Intro({ lang, ui, onNext }) {
  return <section className="center-page"><div className="eyebrow">{tx(lesson.title, lang)}</div><h1 className="hero-title">{ui.introTitle}</h1><p className="hero-subtitle">{ui.introSubtitle}</p><button className="primary-btn" onClick={onNext}>{ui.start} <ChevronRight /></button></section>;
}

function Hook({ lang, ui, hookLeft, onNext }) {
  return <section className="hook-page single-hook"><div className="hook-main"><div className="eyebrow">{ui.hook}</div><h2>{tx(lesson.hook.prompt, lang)}</h2><div className="hook-timer">{hookLeft}</div><button className="primary-btn" onClick={onNext}>{ui.diagnostic} <ChevronRight /></button></div></section>;
}

function Diagnostic({ lang, ui, index, onPick }) {
  const d = lesson.diagnostic[index];
  return <section className="diagnostic-page"><div className="diagnostic-card"><div className="blue-band"><span>{ui.diagnostic}</span><strong>{index+1} / {lesson.diagnostic.length}</strong></div><div className="diagnostic-question">{tx(d.prompt, lang)}</div><div className="option-grid">{d.options[lang].map((op,i)=><button key={op} onClick={() => onPick(i)}>{op}</button>)}</div></div></section>;
}

function Route({ lang, ui, recommended, onChoose }) {
  return <section className="route-page"><h2>{ui.route}</h2><div className="path-grid">{Object.entries(lesson.paths).map(([id,p])=><button key={id} className={`path-card ${id===recommended ? "recommended":""}`} onClick={() => onChoose(id)}><div className="eyebrow">{id}</div><h3>{tx(p.label, lang)}</h3><p>{tx(p.description, lang)}</p></button>)}</div></section>;
}

function Lesson({ lang, ui, problem, step, setStep, onNext, sessionLeft }) {
  const maxStep = problem.reveal.length;
  const visible = problem.reveal.slice(0, step);
  return (
    <section className="lesson-page">
      <div className="lesson-head"><div><div className={`mode-pill mode-${problem.mode}`}>{ui[problem.mode] || problem.mode}</div><h2>{tx(problem.prompt, lang)}</h2></div><div className="timer-pill"><Clock3 size={16} /> {formatTime(sessionLeft)}</div></div>
      <div className="lesson-grid">
        <div className="model-panel"><VisualModel problem={problem} step={step} /></div>
        <div className="steps-panel"><div className="panel-title">{ui.steps}</div>{visible.length===0 && <div className="waiting-box">{ui.answerHidden}</div>}<div className="steps-list">{visible.map((s,i)=><div className="step-item" key={i}><span>{i+1}</span>{tx(s, lang)}</div>)}</div>{step>=maxStep && <div className="student-say"><strong>{ui.studentTask}</strong><p>{tx(problem.studentSay, lang)}</p></div>}</div>
      </div>
      <div className="action-row"><button className="secondary-btn" onClick={() => setStep(Math.max(0, step-1))}>{ui.back}</button>{step<maxStep ? <button className="primary-btn" onClick={() => setStep(step+1)}>{ui.reveal} <ChevronRight /></button> : <button className="primary-btn" onClick={onNext}>{ui.next} <ChevronRight /></button>}</div>
    </section>
  );
}

function Formula({ lang, ui, path, onNext }) {
  return <section className="center-page"><div className="eyebrow">{ui.formula}</div><h2 className="section-title">{tx(path.label, lang)}</h2><div className="formula-list">{path.formula.map(f=><div className="formula-card" key={tx(f,lang)}>{tx(f, lang)}</div>)}</div><button className="primary-btn" onClick={onNext}>{ui.parent} <ChevronRight /></button></section>;
}

function ParentLevelSelect({ lang, ui, recommended, onChoose }) {
  return (
    <section className="route-page parent-level-page">
      <h2>{ui.parentLevelSelect}</h2>
      <p className="route-hint">{ui.parentLevelHint}</p>
      <div className="level-choice-grid">
        {LEVEL_ORDER.map((key) => {
          const level = LEVEL_CATALOG[key];
          return (
            <button key={key} className={`level-choice-card ${key === recommended ? "recommended" : ""}`} onClick={() => onChoose(key)}>
              <div className="level-num">{level.number}</div>
              <h3>{tx(level.title, lang)}</h3>
              <span>{level.range}</span>
              <p>{tx(level.goal, lang)}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Parent({ lang, ui, index, setIndex, step, setStep, onNext }) {
  const item = lesson.parentShowcase[index];
  const fixedProblem = fixBadProblem(item.problem);
  const maxStep = fixedProblem.reveal.length;
  const visible = fixedProblem.reveal.slice(0, step);
  function handleNext() {
    setStep(0);
    onNext();
  }
  return (
    <section className="parent-page">
      <div className="parent-card">
        <Star className="star" />
        <h2>{ui.parent}</h2>
        <div className="parent-layout">
          <div className="parent-left">
            <div className="parent-round">{tx(item.title, lang)}</div>
            <div className="parent-question">{tx(fixedProblem.prompt, lang)}</div>
            <div className="parent-mini-model"><VisualModel problem={fixedProblem} step={step} /></div>
          </div>
          <div className="parent-right">
            <div className="answer-hidden">{ui.explainToParent}</div>
            <div className="parent-step-list">
              {visible.length === 0 && <div className="waiting-box">{ui.answerHidden}</div>}
              {visible.map((s, i) => <div className="step-item" key={i}><span>{i+1}</span>{tx(s, lang)}</div>)}
            </div>
          </div>
        </div>
        <button className="primary-btn parent-next" onClick={step < maxStep ? () => setStep(step + 1) : handleNext}>{step < maxStep ? ui.next : ui.summary} <ChevronRight /></button>
      </div>
    </section>
  );
}

function Summary({ lang, ui, path, onNext }) {
  return <section className="summary-page"><div className="summary-card"><div className="eyebrow">{ui.summary}</div><h2>{tx(path.label, lang)}</h2><div className="summary-grid"><div><h3>{ui.method}</h3><p>{tx(path.summary.method, lang)}</p></div><div><h3>{ui.curriculum}</h3><p>{tx(path.summary.curriculum, lang)}</p></div><div><h3>{ui.ability}</h3><p>{tx(path.ability, lang)}</p></div></div><button className="primary-btn" onClick={onNext}>{ui.levelResult} <ChevronRight /></button></div></section>;
}

function StudentLevel({ lang, ui, currentLevel, onNext }) {
  return (
    <section className="level-result-page">
      <div className="eyebrow">{ui.levelResult}</div>
      <h2>{ui.currentLevel}</h2>
      <div className="staircase">
        {LEVEL_ORDER.map((key, i) => {
          const level = LEVEL_CATALOG[key];
          return (
            <div key={key} className={`stair-card stair-${i + 1} ${key === currentLevel ? "active" : ""}`}>
              <div className="toki-orb">M</div>
              <div className="level-num">{level.number}</div>
              <h3>{tx(level.short, lang)}</h3>
              <span>{level.range}</span>
              <p>{tx(level.slogan, lang)}</p>
              {key === currentLevel && <small>{ui.youAreHere}</small>}
            </div>
          );
        })}
      </div>
      <button className="primary-btn" onClick={onNext}>{ui.levelDetail} <ChevronRight /></button>
    </section>
  );
}

function LevelDetail({ lang, ui, expandedLevel, setExpandedLevel, onNext }) {
  return (
    <section className="level-detail-page">
      <div className="level-detail-head">
        <div>
          <div className="eyebrow">{ui.levelDetail}</div>
          <h2>{ui.lessons}</h2>
        </div>
        <button className="primary-btn" onClick={onNext}>{ui.homework} <ChevronRight /></button>
      </div>
      <div className="accordion-list">
        {LEVEL_ORDER.map((key) => {
          const level = LEVEL_CATALOG[key];
          const open = expandedLevel === key;
          return (
            <div className={`accordion-card ${open ? "open" : ""}`} key={key}>
              <button className="accordion-head" onClick={() => setExpandedLevel(open ? "" : key)}>
                <div className="level-badge">{level.number}</div>
                <div>
                  <h3>{tx(level.title, lang)}</h3>
                  <p>{level.range} · {tx(level.goal, lang)}</p>
                </div>
                <ChevronDown className={open ? "rotate" : ""} />
              </button>
              {open && (
                <div className="lesson-table-wrap">
                  <table className="lesson-table">
                    <thead><tr><th>{ui.lessonNo}</th><th>{ui.topic}</th><th>{ui.curriculum}</th><th>{ui.grade}</th><th>{ui.skill}</th></tr></thead>
                    <tbody>{level.lessons.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{tx(row[1], lang)}</td><td>{tx(row[2], lang)}</td><td>{row[3]}</td><td>{tx(row[4], lang)}</td></tr>)}</tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Homework({ lang, ui, onNext }) {
  return <section className="center-page"><div className="eyebrow">{ui.homework}</div><h2 className="section-title">{tx(lesson.homework.title, lang)}</h2><p className="hero-subtitle homework-desc">{tx(lesson.homework.description, lang)}</p><button className="primary-btn" onClick={onNext}>{ui.map} <ChevronRight /></button></section>;
}

function LearningMap({ lang, ui, onNext }) {
  return <section className="map-page"><h2>{ui.map}</h2><div className="track-map">{lesson.learningMap.tracks.map((track,i)=><div className="map-track" key={i}><h3>{tx(track.name, lang)}</h3><div className="map-nodes">{track.nodes.map((node,j)=>{const active = tx(node,"EN")===lesson.learningMap.current; return <div className={`map-node ${active?"active":""}`} key={j}>{tx(node, lang)}{active && <small>{ui.youAreHere}</small>}</div>})}</div></div>)}</div><button className="primary-btn" onClick={onNext}><Home size={18} /> {ui.complete}</button></section>;
}
