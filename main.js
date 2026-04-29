/* ═══════════════════════════════════════════════════════════
   ChemSafe Pro — Main JavaScript
   FILE: js/main.js
   
   HOW TO EDIT:
   - Each function has a comment explaining what it does
   - To add a product: find PRODUCTS object and add entry
   - To change AI behavior: find CHATBOT section
   - Section loader is at the TOP of this file
══════════════════════════════════════════════════════════ */


    /* ---------------------------------------- */
    const PRODUCTS = {
      'Sprite': {
        name: 'Sprite', category: 'Soft Drink', ph: 3.24,
        ingredients: ['Carbonated Water', 'High Fructose Corn Syrup', 'Citric Acid', 'Sodium Benzoate', 'Sodium Citrate', 'Potassium Sorbate', 'Lime-lemon Flavour'],
        risks: [
          { level: 'danger', icon: '☢️', title: 'Benzene Formation Risk', desc: 'Sodium Benzoate (E211) + Vitamin C can react under heat/light to produce benzene — a known carcinogen linked to leukaemia.' },
          { level: 'danger', icon: '🦷', title: 'Severe Enamel Erosion (pH 3.24)', desc: 'pH below 5.5 actively dissolves tooth enamel. Regular consumption leads to irreversible enamel loss and dentine sensitivity.' },
          { level: 'warn', icon: '⚠️', title: 'Hyperactivity in Children', desc: 'Benzoate preservatives combined with artificial colours linked to increased ADHD symptoms and hyperactivity in children.' },
          { level: 'warn', icon: '🫀', title: 'Inflammatory Pathways', desc: 'Excess sodium benzoate can activate inflammatory pathways and increase free radical production, contributing to chronic disease risk.' }
        ],
        alternatives: ['Plain sparkling water with lemon', 'Coconut water', 'Homemade lime soda (no preservatives)', 'Kombucha (low sugar)'],
        risk: 'High', score: 28,
        summary: 'Sprite is highly acidic with serious enamel erosion and benzene formation risks. High daily consumption is correlated with diabetes and tooth decay.'
      },
      'Diet Coke': {
        name: 'Diet Coke', category: 'Soft Drink', ph: 3.1,
        ingredients: ['Carbonated Water', 'Caramel Colour', 'Aspartame', 'Phosphoric Acid', 'Potassium Benzoate', 'Caffeine', 'Citric Acid', 'Phenylalanine'],
        risks: [
          { level: 'danger', icon: '🦷', title: 'Extreme Enamel Erosion (pH 3.1)', desc: 'One of the most acidic common beverages. Phosphoric acid plus citric acid creates severe and rapid tooth enamel dissolution.' },
          { level: 'danger', icon: '🧬', title: 'Aspartame Metabolism Risk', desc: 'Aspartame breaks down into phenylalanine, aspartate and methanol. Dangerous for PKU patients. Heating produces diketopiperazine (possible carcinogen).' },
          { level: 'warn', icon: '🫀', title: 'Potassium Benzoate + Heat', desc: 'Can form benzene under UV light or heat. Non-alcoholic fatty liver disease risk with high consumption.' },
          { level: 'warn', icon: '🧠', title: 'Caffeine Dependency', desc: 'Regular caffeine intake creates neurological dependency and withdrawal effects including headaches and fatigue.' }
        ],
        alternatives: ['Sparkling water', 'Herbal iced tea (unsweetened)', 'Infused water', 'Plain water with mint'],
        risk: 'High', score: 22,
        summary: 'Diet Coke is one of the most acidic drinks with Aspartame concerns. Particularly dangerous for people with PKU. Linked to fatty liver disease.'
      },
      'Monster Energy': {
        name: 'Monster Energy', category: 'Soft Drink', ph: 3.0,
        ingredients: ['Carbonated Water', 'Glucose', 'Citric Acid', 'Phosphoric Acid', 'Taurine', 'Caffeine (160mg)', 'Niacin', 'Vitamin B6', 'Sodium Benzoate', 'Carbon Dioxide'],
        risks: [
          { level: 'danger', icon: '🫀', title: 'High Caffeine Risk (160mg/can)', desc: 'Equivalent to ~1.6 cups of coffee. Combined with Taurine, can cause palpitations, hypertension, cardiac arrhythmias — especially in young people.' },
          { level: 'danger', icon: '🦷', title: 'Most Acidic (pH 3.0)', desc: 'Lowest pH in common beverages — highly corrosive to tooth enamel within minutes of contact.' },
          { level: 'danger', icon: '🧬', title: 'Benzene Formation + High Sugar', desc: 'Contains sodium benzoate and sugar creating dual risks: benzene formation AND blood sugar spikes.' },
          { level: 'warn', icon: '🧠', title: 'Neurological Effects', desc: 'High caffeine + B-vitamins in large doses can cause insomnia, anxiety, hypertension, and caffeine toxicity in sensitive individuals.' }
        ],
        alternatives: ['Green tea (natural caffeine)', 'Black coffee', 'Electrolyte water', 'Coconut water'],
        risk: 'High', score: 18,
        summary: 'Monster Energy is the highest-risk product in our database: most acidic, highest caffeine, multiple cardiovascular risks. Not recommended for under-18s.'
      },
      'Niacinamide Serum': {
        name: 'Niacinamide Serum', category: 'Cosmetic', ph: 5.8,
        ingredients: ['Water/Aqua', 'Niacinamide 10%', 'Sodium Hyaluronate', 'Bifida Ferment Lysate', 'Dimethyl Isosorbide', 'Propanediol', 'Phenoxyethanol', 'Xanthan Gum', 'Lecithin'],
        risks: [
          { level: 'warn', icon: '🌡️', title: 'Niacinamide Flushing (10%)', desc: 'At 10%, niacinamide may cause skin flushing or redness in sensitive skin, especially if the formula contains residual nicotinic acid.' },
          { level: 'warn', icon: '⚗️', title: 'Penetration Enhancer Concern', desc: 'Dimethyl Isosorbide and Ethoxydiglycol push all substances deeper into skin — including any contaminants from layered products.' },
          { level: 'warn', icon: '🧪', title: 'Phenoxyethanol (Endocrine)', desc: 'Safe at cosmetic concentrations (<1%) but has mild endocrine disruption potential at high exposures. Safe with normal usage.' }
        ],
        alternatives: ["Paula's Choice 10% Niacinamide Booster", 'The Ordinary Niacinamide + Zinc 1%', 'Dot & Key Barrier Repair Serum (with ceramides)'],
        risk: 'Low', score: 78,
        summary: 'Generally safe and well-formulated serum. Suitable for most skin types. Requires 8–12 weeks for visible results. Avoid with high-concentration Vitamin C.'
      },
      'Minoxidil Beard Serum': {
        name: 'Minoxidil Beard Serum', category: 'Cosmetic', ph: 5.0,
        ingredients: ['Minoxidil 5% IP', 'Gokshura (Tribulus extract)', '2-Phenoxyethanol', 'Biotin (B7)', 'Creatine', 'D-Aspartic Acid', 'Aqueous Base'],
        risks: [
          { level: 'danger', icon: '🫀', title: 'Cardiovascular Risk (Minoxidil)', desc: 'Originally a blood pressure drug. Systemic absorption through facial skin can cause palpitations, hypotension, and ECG changes.' },
          { level: 'danger', icon: '🐱', title: 'Hypertrichosis (Unwanted Hair)', desc: 'Uncontrolled spreading via hands or pillowcases causes unwanted hair growth on cheeks, forehead, or partner skin.' },
          { level: 'danger', icon: '💊', title: 'Minoxidil Oral Toxicity', desc: 'If accidentally ingested, causes severe hypotension, tachycardia, and dangerous cardiac effects. Keep away from children.' },
          { level: 'warn', icon: '🔄', title: 'Dependency — Non-permanent', desc: 'All beard growth gained may fall out if use is discontinued. Creates long-term dependency on the product.' }
        ],
        alternatives: ['Redensyl-based beard serums', 'Anagain (Pea Sprout Extract) serums', 'Capixyl + Procapil serums', 'Rosemary Oil serums'],
        risk: 'High', score: 35,
        summary: 'Contains pharmaceutical-grade Minoxidil with serious cardiovascular risks. Not recommended under 18 or for people with heart/kidney conditions.'
      },
      'Paraffin Wax': {
        name: 'Paraffin Wax', category: 'Industrial', ph: 7.0,
        ingredients: ['Long-chain hydrocarbons C20-C40 (~85%)', 'Branched alkanes', 'Cycloalkanes', 'Trace aromatic compounds', 'Sulfur impurities (~1-2%)'],
        risks: [
          { level: 'danger', icon: '🏭', title: 'VOC Emissions When Burned', desc: 'Burning paraffin releases benzene, toluene, and other VOCs. Linked to respiratory issues and indoor air pollution.' },
          { level: 'warn', icon: '🌍', title: 'Non-renewable & Non-biodegradable', desc: 'Derived from petroleum — non-renewable resource. Takes centuries to break down in the environment.' },
          { level: 'warn', icon: '☁️', title: 'Soot Production', desc: 'Produces black soot particles that can accumulate in the lungs with chronic exposure. Not recommended for confined spaces.' }
        ],
        alternatives: ['Beeswax (natural, renewable)', 'Soy wax (plant-based, low carbon)', 'Coconut wax (clean burning)', 'Carnauba wax (food-grade, natural)'],
        risk: 'Medium', score: 48,
        summary: 'Paraffin wax is derived from petroleum and emits VOCs when burned. Safe for general industrial use but not ideal for enclosed spaces or candles.'
      },
      'Hair Gel': {
        name: 'Hair Gel', category: 'Hair Care', ph: 6.5,
        ingredients: ['Water (80–90%)', 'Carbomer (0.3–1%)', 'Glycerin (3–5%)', 'Triethanolamine (0.5–1%)', 'Sodium Benzoate (preservative)', 'Cosmetic fragrance', 'Artificial colour'],
        risks: [
          { level: 'warn', icon: '💀', title: 'Ethanol (Some Brands)', desc: 'Alcohol-based gels dry out scalp and hair shaft, causing brittleness and breakage with prolonged use.' },
          { level: 'warn', icon: '🧪', title: 'Synthetic Fragrance', desc: 'Artificial perfume compounds can cause allergic reactions, scalp irritation, and sensitisation in some users.' },
          { level: 'warn', icon: '🧫', title: 'Propylparaben (Some Brands)', desc: 'Parabens used as preservatives in some formulas may cause skin irritation and have weak endocrine disruption potential.' }
        ],
        alternatives: ['Aloe Vera gel (natural)', 'Flaxseed gel (protein-rich)', 'Shea butter pomade', 'Argan oil styling cream'],
        risk: 'Low', score: 70,
        summary: 'Standard hair gel is generally safe with low risk. Carbomer and glycerin are harmless. Primary concerns are in alcohol-based formulas causing dryness.'
      },
      'Amul Lassi': {
        name: 'Amul Lassi', category: 'Beverage', ph: 4.3,
        ingredients: ['Pasteurised Toned Milk', 'Sugar', 'Water', 'Lactic Acid (natural fermentation)', 'Casein (milk protein)', 'Lactose', 'Calcium', 'Potassium'],
        risks: [
          { level: 'warn', icon: '🥛', title: 'Lactose Intolerance Risk', desc: 'Contains lactose — may cause bloating, diarrhoea, and abdominal cramps in lactose-intolerant individuals.' },
          { level: 'warn', icon: '🍬', title: 'Added Sugar', desc: 'Contains added sugar contributing to caloric intake. Not ideal for diabetics without sugar-free alternatives.' }
        ],
        alternatives: ['Plain unsweetened yogurt', 'Kefir (probiotic-rich)', 'Coconut milk yogurt (dairy-free)', 'Homemade lassi with less sugar'],
        risk: 'Low', score: 82,
        summary: 'Amul Lassi is nutritious and generally safe. Contains natural lactic acid, probiotics, calcium and protein. Main concern is lactose and added sugar.'
      },
      // ─── PLACEHOLDER PRODUCTS (edit these with your team) ───

      // PLACEHOLDER PRODUCTS — Fill in with your team research
      'Product 1': {
        name: 'Product 1', category: 'Category',
        ph: 7.0,
        ingredients: ['Ingredient A', 'Ingredient B', 'Ingredient C', 'Ingredient D'],
        risks: [
          { level: 'warn', icon: '⚠️', title: 'Risk 1 — Edit This', desc: 'Describe the risk of this product here. What chemical is harmful? What does it cause?' },
          { level: 'warn', icon: '🧪', title: 'Risk 2 — Edit This', desc: 'Add a second risk here. Your team can research and fill this in.' }
        ],
        alternatives: ['Alternative 1', 'Alternative 2', 'Alternative 3'],
        risk: 'Medium', score: 60,
        summary: "Edit this summary. Write 1-2 lines about what this product is and its overall safety level."
      },
      'Product 2': {
        name: 'Product 2', category: 'Category',
        ph: 6.5,
        ingredients: ['Ingredient A', 'Ingredient B', 'Ingredient C'],
        risks: [
          { level: 'danger', icon: '☢️', title: 'Risk 1 — Edit This', desc: 'Describe the most serious risk of this product.' },
          { level: 'warn', icon: '⚠️', title: 'Risk 2 — Edit This', desc: 'Add another risk your team found during research.' }
        ],
        alternatives: ['Alternative 1', 'Alternative 2'],
        risk: 'High', score: 40,
        summary: "Edit this summary with your team's findings about this product."
      },
      'Product 3': {
        name: 'Product 3', category: 'Category',
        ph: 5.5,
        ingredients: ['Ingredient A', 'Ingredient B'],
        risks: [
          { level: 'warn', icon: '⚠️', title: 'Risk 1 — Edit This', desc: 'Describe the risk here.' }
        ],
        alternatives: ['Alternative 1', 'Alternative 2'],
        risk: 'Low', score: 75,
        summary: "Edit this summary with your team's product research."
      },
      'Product 4': {
        name: 'Product 4', category: 'Category',
        ph: 4.0,
        ingredients: ['Ingredient A', 'Ingredient B', 'Ingredient C', 'Ingredient D', 'Ingredient E'],
        risks: [
          { level: 'danger', icon: '☢️', title: 'Risk 1 — Edit This', desc: 'Most serious risk here.' },
          { level: 'warn', icon: '⚠️', title: 'Risk 2 — Edit This', desc: 'Second risk here.' },
          { level: 'warn', icon: '🧪', title: 'Risk 3 — Edit This', desc: 'Third risk here.' }
        ],
        alternatives: ['Alternative 1', 'Alternative 2', 'Alternative 3'],
        risk: 'High', score: 30,
        summary: 'Edit this with your research. High risk placeholder product.'
      },
      'Product 5': {
        name: 'Product 5', category: 'Category',
        ph: 7.4,
        ingredients: ['Ingredient A', 'Ingredient B', 'Ingredient C'],
        risks: [
          { level: 'warn', icon: '⚠️', title: 'Risk 1 — Edit This', desc: 'Describe the risk here.' }
        ],
        alternatives: ['Alternative 1', 'Alternative 2'],
        risk: 'Low', score: 80,
        summary: "Edit this summary. Low risk placeholder product for your team to fill in."
      },

      // --- ORIGINAL PRODUCTS ---
      'Hair Dye': {
        name: 'Hair Dye', category: 'Cosmetic', ph: 9.5,
        ingredients: ['p-Phenylenediamine (PPD)', 'Hydrogen Peroxide', 'Ammonia', 'Resorcinol', 'Distilled Water', 'KHSO₄ (Potassium bisulfate)', 'Sodium Hydroxide'],
        risks: [
          { level: 'danger', icon: '☢️', title: 'PPD Allergic Reaction', desc: 'Para-phenylenediamine (PPD) is a potent allergen. Can cause contact dermatitis, anaphylaxis, and severe scalp chemical burns.' },
          { level: 'danger', icon: '🧬', title: 'Ammonia & Hydrogen Peroxide', desc: 'Ammonia raises hair pH to open cuticle — permanently damages hair structure. H₂O₂ bleaches melanin causing protein oxidation.' },
          { level: 'warn', icon: '🫁', title: 'Vapour Inhalation', desc: 'Ammonia fumes can irritate respiratory tract. Always use in well-ventilated area. Prolonged exposure linked to lung issues.' }
        ],
        alternatives: ['Henna (100% natural)', 'Indigo powder', 'Amla-based natural dyes', 'PPD-free oxidative dyes', 'Semi-permanent vegetable dyes'],
        risk: 'High', score: 32,
        summary: 'Hair dye contains potent chemical allergens. Always perform 48-hour patch test before use. PPD is one of the most common contact allergens worldwide.'
      }
    };

    const TESTS_DB = {
      benedict: {
        name: "Benedict's Test",
        reagent: "Benedict's solution (CuSO₄ + Na₂CO₃ + Na₃C₆H₅O₇)",
        principle: "Reducing sugars reduce Cu²⁺ (blue) to Cu₂O (brick red precipitate) in alkaline conditions.",
        colors: [
          { color: "Blue (no change)", hex: "#3b82f6", result: "No reducing sugar present", compound: "Sucrose or non-reducing sugar", confidence: "Negative", meaning: "The sample contains no reducing sugars. Could contain sucrose (table sugar) which is non-reducing, or no sugar at all." },
          { color: "Green", hex: "#22c55e", result: "Trace reducing sugar", compound: "Very low glucose / lactose", confidence: "Weakly Positive", meaning: "Low concentration of reducing sugar detected. Trace glucose or other reducing sugar present." },
          { color: "Yellow / Orange", hex: "#f59e0b", result: "Moderate reducing sugar", compound: "Moderate glucose / maltose", confidence: "Moderately Positive", meaning: "Moderate concentration of reducing sugars. Consistent with diluted fruit juice or low-sugar drinks." },
          { color: "Brick Red / Brown precipitate", hex: "#92400e", result: "High reducing sugar content", compound: "High glucose / lactose / fructose", confidence: "Strongly Positive", meaning: "High concentration of reducing sugars. Typical of Sprite, fruit juice, Amul Lassi (lactose), or sweet beverages." }
        ]
      },
      bromine: {
        name: "Bromine Water Test",
        reagent: "Bromine water (Br₂ dissolved in water — orange-yellow)",
        principle: "Unsaturated compounds break C=C double bonds, decolourising Br₂ by addition across the double bond.",
        colors: [
          { color: "Orange remains (no change)", hex: "#f97316", result: "No unsaturated compounds", compound: "Saturated compound (alkane / alcohol)", confidence: "Negative", meaning: "Sample is saturated. No C=C or C≡C bonds present. Consistent with paraffin wax or saturated fats." },
          { color: "Decolourised (turns colourless)", hex: "#e5e7eb", result: "Unsaturated compounds present", compound: "Alkene / Natural oil / Fatty acid", confidence: "Positive", meaning: "C=C double bonds confirmed. Consistent with natural oils in serum, unsaturated fatty acids, or alkene compounds." }
        ]
      },
      kmno4: {
        name: "KMnO₄ Test",
        reagent: "Dilute potassium permanganate solution (purple)",
        principle: "KMnO₄ (purple) is reduced to MnO₂ (brown) or Mn²⁺ (colourless) by unsaturated/reducing compounds.",
        colors: [
          { color: "Purple remains", hex: "#9333ea", result: "No reducing agent / unsaturated compound", compound: "Saturated or inert compound", confidence: "Negative", meaning: "No oxidisable group detected. Sample is saturated or inert." },
          { color: "Purple fades → brown", hex: "#78350f", result: "Unsaturated compound present", compound: "Alkene / Natural oil", confidence: "Positive (mild)", meaning: "Moderate oxidation occurred. Unsaturated organic compound confirmed. Common in serums containing natural oils." },
          { color: "Purple → colourless", hex: "#d1fae5", result: "Strong reducing agent", compound: "Vitamin C / Glucose / Aldehyde", confidence: "Strongly Positive", meaning: "Powerful reducing agent present. Consistent with Vitamin C (ascorbic acid) or glucose." }
        ]
      },
      dcpip: {
        name: "DCPIP Test (Vitamin C)",
        reagent: "DCPIP (2,6-dichlorophenolindophenol) — blue-purple dye",
        principle: "Vitamin C (a reducing agent) decolourises DCPIP by reducing it from its blue to colourless form.",
        colors: [
          { color: "Blue remains", hex: "#3b82f6", result: "No Vitamin C detected", compound: "Absent or negligible ascorbic acid", confidence: "Negative", meaning: "Little or no Vitamin C present. Not consistent with fresh fruit juice or Vitamin C-fortified products." },
          { color: "Blue → Colourless", hex: "#e0f2fe", result: "Vitamin C confirmed!", compound: "Ascorbic acid (Vitamin C)", confidence: "Strongly Positive", meaning: "Vitamin C definitively detected! The more DCPIP decolourised, the higher the concentration. Common in orange juice, face serums, and health drinks." }
        ]
      },
      iodoform: {
        name: "Iodoform Test",
        reagent: "Iodine (I₂) solution + Sodium Hydroxide (NaOH), warm gently",
        principle: "Alcohols (ethanol) or methyl ketones are oxidised and react with iodine in alkaline conditions forming CHI₃ (yellow precipitate).",
        colors: [
          { color: "No yellow precipitate", hex: "#fef3c7", result: "No ethanol / methyl ketone", compound: "Absent", confidence: "Negative", meaning: "No alcohol or methyl ketone detected. Consistent with alcohol-free products or aqueous solutions." },
          { color: "Yellow precipitate forms", hex: "#fde047", result: "Ethanol / Methyl ketone confirmed", compound: "Ethanol (alcohol) — CHI₃ precipitate", confidence: "Positive", meaning: "Yellow crystalline CHI₃ precipitate confirms ethanol (drinking alcohol or cosmetic alcohol) or a methyl ketone. Found in some hair gels and alcohol-based serums." }
        ]
      },
      fecl3: {
        name: "FeCl₃ Test",
        reagent: "5% Ferric Chloride (FeCl₃) solution",
        principle: "Benzoate ions form a buff/red precipitate (ferric benzoate). Phenols form intense violet/green colours.",
        colors: [
          { color: "No change / remains yellow", hex: "#fef9c3", result: "No benzoate or phenol", compound: "Absent", confidence: "Negative", meaning: "No benzoate preservative or phenol detected in sample." },
          { color: "Buff / red precipitate", hex: "#dc2626", result: "Benzoate detected!", compound: "Sodium Benzoate / Potassium Benzoate", confidence: "Positive — Benzoate", meaning: "Benzoate preservative confirmed! This is the compound that can react with Vitamin C to form benzene (a carcinogen). Found in Sprite, Diet Coke, Monster." },
          { color: "Intense violet / purple", hex: "#7e22ce", result: "Phenol detected", compound: "Phenolic compound", confidence: "Positive — Phenol", meaning: "Phenolic structure confirmed. May indicate phenol-based preservatives or phenolic acids." }
        ]
      },
      biuret: {
        name: "Biuret Test (Protein)",
        reagent: "NaOH (10%) + CuSO₄ (1%) — Biuret reagent (blue)",
        principle: "Cu²⁺ ions form a complex with peptide bonds (–CO–NH–) in proteins, producing a violet/purple colour.",
        colors: [
          { color: "Remains blue", hex: "#3b82f6", result: "No protein detected", compound: "Non-protein sample", confidence: "Negative", meaning: "No peptide bonds detected. Sample contains no protein." },
          { color: "Pink / light purple", hex: "#c084fc", result: "Short-chain peptides present", compound: "Dipeptides / amino acids", confidence: "Weakly Positive", meaning: "Short peptides or amino acids detected. Small polypeptides present." },
          { color: "Violet / purple", hex: "#7c3aed", result: "Protein confirmed!", compound: "Casein (milk) / Serum proteins", confidence: "Strongly Positive", meaning: "Protein definitively confirmed! Consistent with Amul Lassi (casein), face serum (ferment lysate), or any protein-rich food." }
        ]
      },
      sudan3: {
        name: "Sudan III Test (Lipids)",
        reagent: "Sudan III dye (red-orange lipophilic dye)",
        principle: "Sudan III is fat-soluble and stains lipid droplets red-orange, creating a visible layer or coloration.",
        colors: [
          { color: "Dye remains mixed (no separation)", hex: "#fed7aa", result: "No lipids / fats detected", compound: "Absent", confidence: "Negative", meaning: "No lipid content detected. Sample is likely aqueous without oils." },
          { color: "Red / orange ring or layer forms", hex: "#ea580c", result: "Lipids confirmed!", compound: "Oils / Lipids / Fatty acids", confidence: "Positive", meaning: "Lipid/oil content confirmed! Consistent with face serum (natural oils), beard serum (lipid carriers), or fatty food products." }
        ]
      },
      emulsion: {
        name: "Oil Emulsion Test",
        reagent: "Ethanol (absolute) + Distilled Water",
        principle: "Oils dissolve in ethanol; when water is added, lipids precipitate as a milky-white emulsion due to reduced polarity.",
        colors: [
          { color: "Remains clear", hex: "#e0f2fe", result: "No oils / lipids", compound: "Absent", confidence: "Negative", meaning: "No oil or lipid content. Sample is hydrophilic (water-based) with no fatty compounds." },
          { color: "Milky white emulsion forms", hex: "#fafafa", result: "Oils / Lipids confirmed!", compound: "Natural oils, lipids, fatty substances", confidence: "Positive", meaning: "Milky emulsion confirms lipid content! Typical of face serums, beard serums, moisturisers, and fatty foods." }
        ]
      },
      saponification: {
        name: "Saponification Test (Esters)",
        reagent: "Ethanolic NaOH (sodium hydroxide in ethanol), warm gently",
        principle: "Esters react with NaOH to form soap (saponification). Natural wax esters react to produce a soap-like substance.",
        colors: [
          { color: "No soap formation", hex: "#f3f4f6", result: "No ester content", compound: "Absent", confidence: "Negative", meaning: "No ester bonds detected. Sample lacks wax esters or triglycerides." },
          { color: "Soap formation / gel structure", hex: "#d9f99d", result: "Esters confirmed!", compound: "Wax esters / Triglycerides / Fatty acid esters", confidence: "Positive", meaning: "Ester content confirmed through saponification! Consistent with natural waxes (beeswax, soy wax), hair gel (carbomer esters), or lipid-rich products." }
        ]
      },
      ph: {
        name: "pH Paper Test",
        reagent: "Universal indicator / pH paper strips",
        principle: "Indicator dyes change colour across the pH spectrum, reflecting [H⁺] ion concentration in the solution.",
        colors: [
          { color: "Red (pH 1–3)", hex: "#dc2626", result: "Strongly acidic", compound: "Strong acid (HCl, H₂SO₄, etc.)", confidence: "pH 1–3", meaning: "Highly acidic. Tooth enamel dissolves rapidly. Consistent with Monster Energy (3.0), Diet Coke (3.1), Sprite (3.24)." },
          { color: "Orange (pH 3–5)", hex: "#f97316", result: "Moderately acidic", compound: "Weak organic acid (Citric, Lactic)", confidence: "pH 3–5", meaning: "Moderately acidic. Includes fruit juices, lassi, soft drinks. Enamel erosion risk with prolonged exposure." },
          { color: "Yellow (pH 5–6)", hex: "#facc15", result: "Slightly acidic", compound: "Mild organic acid / Buffer", confidence: "pH 5–6", meaning: "Slightly acidic — near skin's natural pH. Safe for cosmetic formulas. Niacinamide serum (5.5–6.5) falls here." },
          { color: "Green (pH 6–8)", hex: "#22c55e", result: "Near neutral", compound: "Pure water / Buffer solution", confidence: "pH 6–8", meaning: "Neutral or near-neutral. Ideal for skin-safe products. Typical of hair gel, safe cosmetics, and water." },
          { color: "Blue (pH 8–10)", hex: "#3b82f6", result: "Alkaline", compound: "Mild alkali (NaHCO₃, Triethanolamine)", confidence: "pH 8–10", meaning: "Alkaline. Typical of hair dye (pH ~9–10) and some soaps. Can disrupt skin's acid mantle." },
          { color: "Violet / Purple (pH 10–14)", hex: "#7e22ce", result: "Strongly alkaline", compound: "Strong base (NaOH, Ca(OH)₂)", confidence: "pH 10–14", meaning: "Strongly alkaline. Can cause chemical burns at extreme pH. Industrial cleaning agents and some hair relaxers." }
        ]
      },
      esterification: {
        name: "Esterification Test",
        reagent: "Ethanol + concentrated H₂SO₄ (catalyst), warm gently",
        principle: "Carboxylic acids react with ethanol in the presence of acid catalyst to form esters with distinctive fruity aromas.",
        colors: [
          { color: "No fruity smell", hex: "#f3f4f6", result: "No carboxylic acid present", compound: "Absent", confidence: "Negative", meaning: "No carboxylic acid detected. Sample lacks organic acids." },
          { color: "Fruity / sweet smell produced", hex: "#fde68a", result: "Carboxylic acid confirmed!", compound: "Citric acid / Benzoic acid / Acetic acid", confidence: "Positive", meaning: "Ester formation confirmed by characteristic fruity smell! Citric acid (Sprite, Monster), benzoic acid (preservatives), or other organic acids present." }
        ]
      }
    };

    const DYK_FACTS = [
      "Sprite's sodium benzoate + citric acid can form benzene under UV light — the same compound found in cigarette smoke!",
      "Monster Energy at pH 3.0 is nearly 100× more acidic than black coffee (pH 5.0) — both are acids, but on a log scale.",
      "Minoxidil was originally invented in 1963 as an ulcer treatment. It failed for ulcers but accidentally grew hair in patients!",
      "Tooth enamel is the hardest substance in the human body — yet pH 5.5 is enough to start dissolving it. Diet Coke at pH 3.1 is terrifying for teeth.",
      "Niacinamide (Vitamin B3) is one of the most studied cosmetic ingredients — over 1,000 clinical papers support its skin benefits.",
      "Beeswax has been used by humans for 9,000 years! It's found in ancient Egyptian cosmetics and still in modern lip balms.",
      "The purple colour of KMnO₄ fades when it oxidises organic compounds — it's literally donating oxygen molecules to the sample.",
      "Benedict's solution turns brick red because glucose reduces Cu²⁺ (blue) to Cu₂O (red copper oxide) — a visible chemistry reaction!",
      "Lactic acid in Amul Lassi is produced by Lactobacillus bacteria fermenting lactose — the same mechanism that makes yogurt tangy.",
      "Paraffin wax when burned releases the same VOCs as tobacco smoke in an enclosed room — including trace benzene and toluene."
    ];

    let phChart = null, dashPhChart = null, dashRiskChart = null, waxChart = null;
    let dashSortKey = null, dashSortDir = 1;

    /* ---------------------------------------- */
    function showSection(id) {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

      if (id === 'home') {
        document.getElementById('section-home').classList.add('active');
      } else {
        const el = document.getElementById('section-' + id);
        if (el) el.classList.add('active');
      }
      document.querySelector(`[data-s="${id}"]`).classList.add('active');

      // Init charts lazily
      if (id === 'ph' && !phChart) initPHChart();
      if (id === 'dashboard') initDashboard();
      if (id === 'wax' && !waxChart) initWaxChart();
      if (id === 'compare') initComparator();
      if (id === 'credits') return;
    }

    /* ---------------------------------------- */
    function analyzerSuggest(val) {
      const el = document.getElementById('ana-suggestions');
      if (!val.trim()) { el.innerHTML = ''; return; }
      const matches = Object.keys(PRODUCTS).filter(k => k.toLowerCase().includes(val.toLowerCase()));
      el.innerHTML = matches.map(k =>
        `<button class="badge badge-info" style="cursor:pointer;font-size:12px;padding:5px 12px" onclick="quickAnalyze('${k}')">${k}</button>`
      ).join('');
    }

    function quickAnalyze(name) {
      document.getElementById('ana-input').value = name;
      runAnalysis();
    }

    function runAnalysis() {
      const val = document.getElementById('ana-input').value.trim();
      if (!val) return;

      let product = PRODUCTS[val];
      if (!product) {
        const key = Object.keys(PRODUCTS).find(k => k.toLowerCase().includes(val.toLowerCase()) || val.toLowerCase().includes(k.toLowerCase()));
        product = key ? PRODUCTS[key] : null;
      }

      if (!product) {
        openModal('🔎 Not Found', `<div style="text-align:center;padding:30px">
      <div style="font-size:3rem;margin-bottom:12px">🔎</div>
      <p style="color:var(--text);font-size:14px">Product <strong>"${val}"</strong> not found.</p>
      <p style="font-size:12px;color:var(--text-muted);margin-top:8px">Try: Sprite, Diet Coke, Monster, Niacinamide Serum, Minoxidil, Paraffin Wax, Hair Gel, Amul Lassi, Hair Dye</p>
    </div>`);
        return;
      }

      // Spinner
      showSpinner('analyzer-result-wrap');
      setTimeout(() => {
        hideSpinner('analyzer-result-wrap');
        _showAnalysisModal(product);
      }, 900);
    }

    function _showAnalysisModal(product) {
      const riskColor = { 'High': 'danger', 'Medium': 'warn', 'Low': 'safe' }[product.risk];
      const scoreColor = product.score >= 70 ? '#059669' : product.score >= 45 ? '#d97706' : '#dc2626';
      const pulseClass = product.score >= 70 ? 'pulse-safe' : product.score >= 45 ? 'pulse-warn' : 'pulse-danger';
      const r = 54, circ = 2 * Math.PI * r;
      const fill = (product.score / 100) * circ;

      const html = `
  <div class="result-panel" style="border:none;padding:0;background:transparent;animation:none">
    <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px;flex-wrap:wrap">
      <div class="score-ring-wrap" style="flex-shrink:0">
        <div class="${pulseClass}" style="border-radius:50%;width:130px;height:130px;display:flex;align-items:center;justify-content:center">
        <svg class="score-ring-svg score-anim" width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="${r}" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="10"/>
          <circle cx="65" cy="65" r="${r}" fill="none" stroke="${scoreColor}" stroke-width="10"
            stroke-dasharray="0 ${circ}" stroke-dashoffset="${circ / 4}" stroke-linecap="round"
            id="score-ring-arc" style="transition:stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)"/>
          <text x="65" y="58" text-anchor="middle" fill="${scoreColor}" font-size="22" font-family="Orbitron,monospace" font-weight="900" id="score-ring-num">0</text>
          <text x="65" y="75" text-anchor="middle" fill="#4a7a72" font-size="9" font-family="Exo 2,sans-serif">/100</text>
        </svg>
        </div>
        <div class="score-ring-lbl" style="color:#4a7a72">Safety Score</div>
      </div>
      <div style="flex:1;min-width:180px">
        <div class="result-product-name">${product.name}</div>
        <div class="result-category" style="color:#4a7a72">${product.category} • pH ${product.ph}</div>
        <span class="badge badge-${riskColor}">${product.risk} Risk</span>
        <p style="font-size:13px;color:#4a7a72;margin-top:10px;line-height:1.6">${product.summary}</p>
      </div>
    </div>
    <hr class="thin">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4a7a72;margin-bottom:10px">⚠️ Risk Flags</div>
    ${product.risks.map(r => `<div class="flag-item"><div class="flag-icon">${r.icon}</div><div>
      <div class="flag-title" style="color:var(--${r.level === 'danger' ? 'danger' : r.level === 'warn' ? 'warn' : 'safe'})">${r.title}</div>
      <div class="flag-desc">${r.desc}</div></div></div>`).join('')}
    <hr class="thin">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4a7a72;margin-bottom:10px">🌿 Safer Alternatives</div>
    ${product.alternatives.map(a => `<div class="alt-item"><span style="color:var(--neon)">✓</span> ${a}</div>`).join('')}
    <hr class="thin">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4a7a72;margin-bottom:8px">🧪 Key Ingredients</div>
    <div>${product.ingredients.map(i => `<span class="tag-chip">${i}</span>`).join('')}</div>
  </div>`;

      openModal('🔬 ' + product.name + ' — Analysis', html);

      // Animate score ring + counter after modal opens
      setTimeout(() => {
        const arc = document.getElementById('score-ring-arc');
        const num = document.getElementById('score-ring-num');
        if (arc) arc.setAttribute('stroke-dasharray', `${fill} ${circ}`);
        if (num) animateScore(num, product.score);
        if (product.score >= 70) setTimeout(launchConfetti, 500);
      }, 120);
    }

    /* ---------------------------------------- */
    function updateColorOptions() {
      const testId = document.getElementById('test-type').value;
      const sel = document.getElementById('color-obs');
      sel.innerHTML = '<option value="">— Select observed colour —</option>';
      if (!testId || !TESTS_DB[testId]) return;
      TESTS_DB[testId].colors.forEach((c, i) => {
        sel.innerHTML += `<option value="${i}">${c.color}</option>`;
      });
    }

    function interpretTest() {
      const testId = document.getElementById('test-type').value;
      const colorIdx = document.getElementById('color-obs').value;
      const sample = document.getElementById('sample-desc').value;

      if (!testId || colorIdx === '') {
        alert('Please select a test type and observed colour.');
        return;
      }

      const test = TESTS_DB[testId];
      const obs = test.colors[parseInt(colorIdx)];
      const wrap = document.getElementById('test-result-wrap');

      const confColor = obs.confidence.includes('Strongly') ? 'var(--neon)' :
        obs.confidence.includes('Positive') ? 'var(--warn)' :
          obs.confidence === 'Negative' ? 'var(--danger)' : 'var(--neon2)';

      const html = `
    <div class="test-result-card" style="border:none;background:transparent;padding:0;animation:none">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <div style="width:28px;height:28px;border-radius:50%;background:${obs.hex};border:2px solid rgba(255,255,255,0.3);flex-shrink:0"></div>
        <div>
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">${test.name}</div>
          <div style="font-size:13px;font-weight:600;color:var(--text)">${obs.color}</div>
        </div>
      </div>
      ${sample ? `<div style="font-size:11px;color:var(--neon2);margin-bottom:10px">Sample: ${sample}</div>` : ''}
      <div class="compound-name">${obs.compound}</div>
      <div style="margin-bottom:14px">
        <span class="badge" style="background:${confColor}22;color:${confColor};border-color:${confColor}55">${obs.confidence}</span>
        <span class="badge badge-info" style="margin-left:6px">${obs.result}</span>
      </div>
      <hr class="thin">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:6px">📝 Interpretation</div>
      <p style="font-size:13px;line-height:1.7;color:var(--text-muted)">${obs.meaning}</p>
      <hr class="thin">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:6px">🔬 Test Principle</div>
      <p style="font-size:12px;line-height:1.6;color:var(--text-dim)">${test.principle}</p>
      <div style="margin-top:10px;padding:10px;background:rgba(0,0,0,0.2);border-radius:8px">
        <span style="font-size:11px;color:var(--text-dim);font-weight:600">Reagent:</span>
        <span style="font-size:12px;color:var(--text-muted);margin-left:6px">${test.reagent}</span>
      </div>
    </div>`;
    }

    /* ---------------------------------------- */
    function syncPHInput(val) {
      if (val >= 0 && val <= 14) {
        document.getElementById('ph-range').value = val;
        updatePHMeter(val);
      }
    }
    function setPH(val) {
      document.getElementById('ph-range').value = val;
      document.getElementById('ph-input').value = val;
      updatePHMeter(val);
    }

    function updatePHMeter(val) {
      val = parseFloat(val);
      document.getElementById('ph-range-val').textContent = val.toFixed(1);
      document.getElementById('ph-display').textContent = val.toFixed(1);
      document.getElementById('ph-input').value = val;

      // Rotate needle: pH 0 = -90deg, pH 7 = 0deg, pH 14 = +90deg
      const deg = ((val / 14) * 180) - 90;
      document.getElementById('ph-needle').style.transform = `rotate(${deg}deg)`;

      // Arc fill: full arc = 377 units
      const offset = 377 - ((val / 14) * 377);
      document.getElementById('ph-arc-fill').setAttribute('stroke-dashoffset', offset);

      // Verdict
      let verdict, color, detail;
      if (val < 3.0) {
        verdict = '⚠️ EXTREME DANGER'; color = '#ff2244';
        detail = `<strong style="color:#ff4560">Catastrophic enamel risk.</strong> pH below 3.0 is extremely corrosive. Even brief contact dissolves enamel. Risk of irreversible dental damage within weeks of daily use. Also linked to severe digestive tract irritation.`;
      } else if (val < 4.0) {
        verdict = '🚨 HIGHLY DANGEROUS'; color = '#ff4560';
        detail = `<strong style="color:#ff4560">Critical enamel dissolution zone.</strong> pH ${val.toFixed(1)} is well below the critical threshold of 5.5. Regular consumption will cause progressive, irreversible enamel loss. High risk of dentine exposure and tooth sensitivity.`;
      } else if (val < 5.5) {
        verdict = '⚠️ MODERATE RISK'; color = '#ffa500';
        detail = `<strong style="color:#ffa500">Below critical enamel threshold (5.5).</strong> pH ${val.toFixed(1)} still erodes enamel with regular exposure. Risk is lower but cumulative. Use a straw and rinse with water after consumption.`;
      } else if (val < 6.5) {
        verdict = '✅ LOW RISK'; color = '#00d2b4';
        detail = `<strong style="color:#00d2b4">Near skin-safe / tooth-safe zone.</strong> pH ${val.toFixed(1)} is close to the natural acid mantle (4.5–5.5 for skin) and safe for enamel (above 5.5). Suitable for cosmetic formulas and beverages with moderation.`;
      } else if (val < 8.0) {
        verdict = '✅ NEUTRAL — SAFE'; color = '#00d2b4';
        detail = `<strong style="color:#00d2b4">Neutral zone.</strong> pH ${val.toFixed(1)} is ideal for drinking water and safe cosmetics. No enamel erosion risk. Optimal for biological systems.`;
      } else if (val < 10) {
        verdict = '⚠️ ALKALINE CAUTION'; color = '#ffa500';
        detail = `<strong style="color:#ffa500">Mildly alkaline.</strong> pH ${val.toFixed(1)} can disrupt the skin's acid mantle (pH 4.5–5.5). Typical of soaps and hair products. Can cause dryness and barrier disruption with regular skin contact.`;
      } else {
        verdict = '🚨 STRONGLY ALKALINE'; color = '#ff4560';
        detail = `<strong style="color:#ff4560">Highly alkaline — handle with caution.</strong> pH ${val.toFixed(1)} can cause chemical burns and severe skin/eye irritation. Industrial-grade alkali. Restricted for professional use only.`;
      }

      document.getElementById('ph-verdict').textContent = verdict;
      document.getElementById('ph-verdict').style.color = color;
      document.getElementById('ph-detail').innerHTML = detail;
    }

    function calcPHRisk() {
      const ph = parseFloat(document.getElementById('ph-input').value);
      const servings = parseInt(document.getElementById('ph-servings').value) || 2;
      if (!ph && ph !== 0) return;

      const card = document.getElementById('ph-chart-card');
      card.style.display = 'block';
      if (phChart) phChart.destroy();
      showSpinner('ph-chart-card');
      setTimeout(() => { hideSpinner('ph-chart-card'); _buildPHChart(ph, servings); }, 700);
    }
    function _buildPHChart(ph, servings) {
      const card = document.getElementById('ph-chart-card');
      if (phChart) phChart.destroy();

      const months = [1, 3, 6, 12, 24, 36, 60];
      const baseRisk = ph < 3 ? 95 : ph < 4 ? 75 : ph < 5.5 ? 45 : ph < 6.5 ? 15 : 5;
      const servingMultiplier = 1 + (servings - 1) * 0.15;

      const riskData = months.map(m => Math.min(99, baseRisk * servingMultiplier * Math.log(m + 1) / Math.log(2)));
      const color = ph < 4 ? '#ff4560' : ph < 5.5 ? '#ffa500' : '#00d2b4';

      const ctx = document.getElementById('ph-chart').getContext('2d');
      phChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: months.map(m => m < 12 ? `${m}mo` : `${m / 12}yr`),
          datasets: [{
            label: 'Cumulative Enamel Erosion Risk (%)',
            data: riskData,
            borderColor: color,
            backgroundColor: color + '22',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: color,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#1a3330', font: { family: 'Exo 2', size: 12 } } },
            tooltip: {
              backgroundColor: '#ffffff',
              borderColor: 'rgba(0,150,130,0.3)',
              borderWidth: 1,
              titleColor: '#007a6a',
              bodyColor: '#1a3330',
              callbacks: { label: ctx => ` Risk: ${ctx.parsed.y.toFixed(1)}%` }
            }
          },
          scales: {
            x: { ticks: { color: '#4a7a72' }, grid: { color: 'rgba(0,0,0,0.05)' } },
            y: {
              ticks: { color: '#4a7a72', callback: v => v + '%' },
              grid: { color: 'rgba(0,0,0,0.05)' },
              max: 100
            }
          }
        }
      });
    }

    function initPHChart() {
      updatePHMeter(3.5);
      document.getElementById('ph-chart-card').style.display = 'none';
    }

    /* ---------------------------------------- */
    let dashData = Object.values(PRODUCTS);
    let dashFiltered = [...dashData];

    function initDashboard() {
      renderDashTable(dashFiltered);
      if (!dashPhChart) initDashCharts();
    }

    function initDashCharts() {
      const names = Object.keys(PRODUCTS);
      const phs = Object.values(PRODUCTS).map(p => p.ph);
      const phColors = phs.map(p => p < 4 ? '#ff4560' : p < 5.5 ? '#ffa500' : p < 7 ? '#00d2b4' : '#00aaff');

      const ctx1 = document.getElementById('dashboard-ph-chart').getContext('2d');
      dashPhChart = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: names.map(n => n.length > 12 ? n.slice(0, 12) + '…' : n),
          datasets: [{
            label: 'pH Value',
            data: phs,
            backgroundColor: phColors,
            borderColor: phColors,
            borderWidth: 0,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#ffffff', borderColor: 'rgba(0,150,130,0.3)', borderWidth: 1,
              titleColor: '#007a6a', bodyColor: '#1a3330',
              callbacks: { label: ctx => ` pH: ${ctx.parsed.y}` }
            }
          },
          scales: {
            x: { ticks: { color: '#4a7a72', font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
            y: {
              ticks: { color: '#4a7a72' }, grid: { color: 'rgba(0,0,0,0.05)' }, min: 0, max: 14,
              title: { display: true, text: 'pH Value', color: '#4a7a72' }
            }
          }
        }
      });

      const riskCounts = { Low: 0, Medium: 0, High: 0 };
      Object.values(PRODUCTS).forEach(p => riskCounts[p.risk]++);
      const ctx2 = document.getElementById('dashboard-risk-chart').getContext('2d');
      dashRiskChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Low Risk', 'Medium Risk', 'High Risk'],
          datasets: [{
            data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
            backgroundColor: ['#00d2b422', '#ffa50022', '#ff456022'],
            borderColor: ['#00d2b4', '#ffa500', '#ff4560'],
            borderWidth: 2, hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#1a3330', font: { family: 'Exo 2', size: 12 } } },
            tooltip: {
              backgroundColor: '#ffffff', borderColor: 'rgba(0,150,130,0.3)', borderWidth: 1,
              titleColor: '#007a6a', bodyColor: '#1a3330'
            }
          }
        }
      });
    }

    function renderDashTable(data) {
      const tbody = document.getElementById('dash-tbody');
      tbody.innerHTML = data.map(p => {
        const rc = { High: 'danger', Medium: 'warn', Low: 'safe' }[p.risk];
        const phColor = p.ph < 4 ? '#ff4560' : p.ph < 5.5 ? '#ffa500' : p.ph < 7 ? '#00d2b4' : '#00aaff';
        const ingStr = p.ingredients.slice(0, 3).join(', ') + (p.ingredients.length > 3 ? '…' : '');
        return `<tr>
      <td><strong style="color:var(--text)">${p.name}</strong></td>
      <td><span class="tag-chip">${p.category}</span></td>
      <td><span class="ph-val" style="background:${phColor}22;color:${phColor};border:1px solid ${phColor}55">${p.ph}</span></td>
      <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;color:var(--text-muted)">${ingStr}</td>
      <td><span class="badge badge-${rc}">${p.risk}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:60px;height:5px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
            <div style="width:${p.score}%;height:100%;background:${p.score >= 70 ? '#00d2b4' : p.score >= 45 ? '#ffa500' : '#ff4560'};border-radius:3px"></div>
          </div>
          <span style="font-size:12px;font-family:var(--font-mono)">${p.score}</span>
        </div>
      </td>
    </tr>`;
      }).join('');
    }

    function filterDash() {
      const q = document.getElementById('dash-search').value.toLowerCase();
      const risk = document.getElementById('dash-filter-risk').value;
      const cat = document.getElementById('dash-filter-cat').value;
      dashFiltered = dashData.filter(p =>
        (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        (!risk || p.risk === risk) &&
        (!cat || p.category === cat)
      );
      renderDashTable(dashFiltered);
    }

    function sortDash(key) {
      if (dashSortKey === key) dashSortDir *= -1; else { dashSortKey = key; dashSortDir = 1; }
      dashFiltered.sort((a, b) => {
        const va = a[key], vb = b[key];
        if (typeof va === 'number') return (va - vb) * dashSortDir;
        return String(va).localeCompare(String(vb)) * dashSortDir;
      });
      renderDashTable(dashFiltered);
    }

    /* ---------------------------------------- */
    function waxUpdate() {
      document.getElementById('wax-aromatic-val').textContent = document.getElementById('wax-aromatic').value + '%';
      document.getElementById('wax-sulfur-val').textContent = document.getElementById('wax-sulfur').value + '%';
      document.getElementById('wax-poly-val').textContent = document.getElementById('wax-poly').value + '%';
    }

    function scoreWax() {
      const source = document.getElementById('wax-source').value;
      const aromatic = parseFloat(document.getElementById('wax-aromatic').value);
      const sulfur = parseFloat(document.getElementById('wax-sulfur').value);
      const poly = parseFloat(document.getElementById('wax-poly').value);
      const bio = document.getElementById('wax-bio').value;

      // Base score
      let score = 100;
      // Source penalty/bonus
      if (source === 'petroleum') score -= 30;
      else if (source === 'plant') score += 10;
      else if (source === 'animal') score += 5;
      else if (source === 'synthetic') score -= 15;

      // Aromatic hydrocarbons: threshold 13%
      if (aromatic > 15) score -= 30;
      else if (aromatic > 13) score -= 20;
      else if (aromatic > 8) score -= 10;
      else score += 5;

      // Sulfur: threshold 0.5%
      if (sulfur > 1) score -= 20;
      else if (sulfur > 0.5) score -= 12;
      else if (sulfur < 0.2) score += 5;

      // Polycyclic: threshold 1%
      if (poly > 3) score -= 20;
      else if (poly > 1) score -= 10;
      else score += 5;

      // Biodegradability
      if (bio === 'yes') score += 10;
      else if (bio === 'partial') score += 3;
      else score -= 10;

      score = Math.max(0, Math.min(100, Math.round(score)));

      const grade = score >= 80 ? { label: 'Excellent', color: '#00d2b4', icon: '🌿' } :
        score >= 60 ? { label: 'Good', color: '#00aaff', icon: '✅' } :
          score >= 40 ? { label: 'Moderate', color: '#ffa500', icon: '⚠️' } :
            { label: 'Poor — Harmful', color: '#ff4560', icon: '☢️' };

      const flags = [];
      if (source === 'petroleum') flags.push({ icon: '🛢️', title: 'Petroleum-based', desc: 'Non-renewable source. Emits VOCs (benzene, toluene) when burned. Switch to soy or beeswax.' });
      if (aromatic > 13) flags.push({ icon: '☁️', title: `Aromatic Hydrocarbons ${aromatic}% (Limit: 13%)`, desc: 'Above safe limit. Aromatic compounds include potential carcinogens. Needs refining.' });
      if (sulfur > 0.5) flags.push({ icon: '⚗️', title: `Sulfur ${sulfur}% (Limit: 0.5%)`, desc: 'High sulfur causes SO₂ emissions when burned. Irritates respiratory tract.' });
      if (poly > 1) flags.push({ icon: '🧬', title: `Polycyclic Hydrocarbons ${poly}% (Limit: 1%)`, desc: 'PAHs are potent carcinogens. Must be below 1% for consumer safety.' });
      if (bio === 'no') flags.push({ icon: '🌍', title: 'Non-biodegradable', desc: 'Does not break down naturally. Contributes to environmental pollution.' });

      const alts = [];
      if (source === 'petroleum' || score < 50) {
        alts.push('🌱 Soy Wax — plant-based, clean burning, biodegradable (score ~85/100)');
        alts.push('🐝 Beeswax — natural, air-purifying, 9000-year history of safe use (score ~90/100)');
        alts.push('🥥 Coconut Wax — carbon-neutral, slow-burning, food-grade safe (score ~88/100)');
        alts.push('🌴 Carnauba Wax — natural palm leaf, food & cosmetic grade (score ~82/100)');
      }

      showSpinner('wax-result-wrap');
      setTimeout(() => { hideSpinner('wax-result-wrap'); _showWaxModal(score, grade, flags, alts); }, 800);
    }
    function _showWaxModal(score, grade, flags, alts) {
      const scoreColor = score >= 70 ? '#059669' : score >= 45 ? '#d97706' : '#dc2626';
      const pulseClass = score >= 70 ? 'pulse-safe' : score >= 45 ? 'pulse-warn' : 'pulse-danger';

      let flagsHtml = '';
      if (flags.length) {
        flagsHtml += '<hr class="thin"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#4a7a72;margin-bottom:10px">⚠️ Issues Detected</div>';
        flags.forEach(f => {
          flagsHtml += '<div class="flag-item"><div class="flag-icon">' + f.icon + '</div><div>';
          flagsHtml += '<div class="flag-title" style="color:var(--danger)">' + f.title + '</div>';
          flagsHtml += '<div class="flag-desc">' + f.desc + '</div></div></div>';
        });
      } else {
        flagsHtml = '<div class="flag-item" style="background:rgba(0,150,130,0.05);border-color:rgba(0,150,130,0.2)"><div class="flag-icon">✅</div><div><div class="flag-title" style="color:var(--safe)">All Parameters Pass</div><div class="flag-desc">No major environmental concerns detected.</div></div></div>';
      }

      let altsHtml = '';
      if (alts.length) {
        altsHtml += '<hr class="thin"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#4a7a72;margin-bottom:8px">🌿 Eco-Friendly Alternatives</div>';
        alts.forEach(a => { altsHtml += '<div class="alt-item"><span style="color:var(--neon)">✓</span>' + a + '</div>'; });
      }

      const meterClass = score >= 70 ? 'fill-safe' : score >= 45 ? 'fill-warn' : 'fill-danger';

      const html = '<div class="' + pulseClass + '" style="border-radius:12px;padding:2px">'
        + '<div style="background:#fff;border-radius:10px;padding:16px">'
        + '<div class="wax-score-display">'
        + '<div class="wax-big-score" id="wax-score-num" style="color:' + scoreColor + '">0</div>'
        + '<div style="font-size:24px;margin:4px 0">' + grade.icon + '</div>'
        + '<div style="color:' + grade.color + ';font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em">' + grade.label + '</div>'
        + '<div style="font-size:12px;color:#4a7a72;margin-top:4px">Sustainability Score / 100</div>'
        + '</div>'
        + '<div class="meter-wrap"><div class="meter-label"><span>0</span><span>100</span></div>'
        + '<div class="meter-bar"><div class="meter-fill ' + meterClass + '" id="wax-meter-fill" style="width:0%"></div></div></div>'
        + flagsHtml + altsHtml
        + '</div></div>';

      openModal('♻️ Wax Sustainability Score', html);

      setTimeout(() => {
        const numEl = document.getElementById('wax-score-num');
        const fillEl = document.getElementById('wax-meter-fill');
        if (numEl) animateScore(numEl, score);
        if (fillEl) { fillEl.style.transition = 'width 1s ease'; fillEl.style.width = score + '%'; }
        if (score >= 70) setTimeout(launchConfetti, 500);
      }, 150);
    }

    function initWaxChart() {
      const waxTypes = ['Paraffin', 'Soy Wax', 'Beeswax', 'Coconut Wax', 'Carnauba', 'Rice Bran', 'Synth.'];
      const scores = [35, 85, 90, 88, 82, 78, 52];
      const colors = scores.map(s => s >= 70 ? '#00d2b4' : s >= 50 ? '#ffa500' : '#ff4560');

      const ctx = document.getElementById('wax-chart').getContext('2d');
      waxChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: waxTypes,
          datasets: [{
            label: 'Sustainability Score',
            data: scores,
            backgroundColor: colors.map(c => c + '33'),
            borderColor: colors,
            borderWidth: 2,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#ffffff', borderColor: 'rgba(0,150,130,0.3)', borderWidth: 1,
              titleColor: '#007a6a', bodyColor: '#1a3330',
              callbacks: { label: ctx => ` Score: ${ctx.parsed.y}/100` }
            }
          },
          scales: {
            x: { ticks: { color: '#4a7a72' }, grid: { color: 'rgba(0,0,0,0.05)' } },
            y: {
              ticks: { color: '#4a7a72' }, grid: { color: 'rgba(0,0,0,0.05)' }, min: 0, max: 100,
              title: { display: true, text: 'Sustainability Score', color: '#4a7a72' }
            }
          }
        }
      });
    }

    /* ---------------------------------------- */
    function initComparator() {
      const selA = document.getElementById('comp-a');
      const selB = document.getElementById('comp-b');
      if (selA.children.length > 1) return;
      Object.keys(PRODUCTS).forEach(k => {
        selA.innerHTML += `<option value="${k}">${k}</option>`;
        selB.innerHTML += `<option value="${k}">${k}</option>`;
      });
      selA.value = 'Sprite';
      selB.value = 'Amul Lassi';
      runComparison();
    }

    function runComparison() {
      const aKey = document.getElementById('comp-a').value;
      const bKey = document.getElementById('comp-b').value;
      if (!aKey || !bKey) return;
      const a = PRODUCTS[aKey], b = PRODUCTS[bKey];

      const winner = a.score >= b.score ? 'a' : 'b';
      const rA = { High: 'danger', Medium: 'warn', Low: 'safe' }[a.risk];
      const rB = { High: 'danger', Medium: 'warn', Low: 'safe' }[b.risk];
      const scA = a.score >= 70 ? '#059669' : a.score >= 45 ? '#d97706' : '#dc2626';
      const scB = b.score >= 70 ? '#059669' : b.score >= 45 ? '#d97706' : '#dc2626';
      const phColA = a.ph < 4 ? '#dc2626' : a.ph < 5.5 ? '#d97706' : '#059669';
      const phColB = b.ph < 4 ? '#dc2626' : b.ph < 5.5 ? '#d97706' : '#059669';

      function riskRows(p, scCol, phCol, rClass) {
        let rows = '';
        rows += '<div class="compare-row"><span class="compare-row-label">PH</span><span style="color:' + phCol + ';font-weight:700">' + p.ph + '</span></div>';
        rows += '<div class="compare-row"><span class="compare-row-label">RISK</span><span class="badge badge-' + rClass + '">' + p.risk + '</span></div>';
        rows += '<div class="compare-row"><span class="compare-row-label">SCORE</span><span style="color:' + scCol + ';font-weight:700">' + p.score + '/100</span></div>';
        return rows;
      }

      function riskList(p) {
        return p.risks.slice(0, 3).map(r =>
          '<div style="font-size:12px;color:#4a7a72;padding:4px 0;display:flex;gap:6px"><span>' + r.icon + '</span><span>' + r.title + '</span></div>'
        ).join('');
      }

      const winnerBadge = '<div class="compare-winner-badge">⭐ Safer Choice</div>';

      let html = '<div class="compare-grid">';

      // Column A
      html += '<div class="compare-col card" style="position:relative;' + (winner === 'a' ? 'border-color:var(--neon);box-shadow:var(--glow)' : '') + '">';
      if (winner === 'a') html += winnerBadge;
      html += '<div style="text-align:center;margin-bottom:16px">';
      html += '<div style="font-family:var(--font-head);font-size:0.95rem;font-weight:700;margin-bottom:6px">' + a.name + '</div>';
      html += '<span class="badge badge-' + rA + '">' + a.risk + ' Risk</span></div>';
      html += riskRows(a, scA, phColA, rA);
      html += '<hr class="thin"><div style="font-size:11px;text-transform:uppercase;color:#4a7a72;letter-spacing:0.06em;margin-bottom:8px">Risks</div>';
      html += riskList(a);
      html += '<hr class="thin"><p style="font-size:12px;color:#4a7a72;line-height:1.6">' + a.summary + '</p>';
      html += '</div>';

      // VS divider
      html += '<div class="compare-vs">VS</div>';

      // Column B
      html += '<div class="compare-col card" style="position:relative;' + (winner === 'b' ? 'border-color:var(--neon);box-shadow:var(--glow)' : '') + '">';
      if (winner === 'b') html += winnerBadge;
      html += '<div style="text-align:center;margin-bottom:16px">';
      html += '<div style="font-family:var(--font-head);font-size:0.95rem;font-weight:700;margin-bottom:6px">' + b.name + '</div>';
      html += '<span class="badge badge-' + rB + '">' + b.risk + ' Risk</span></div>';
      html += riskRows(b, scB, phColB, rB);
      html += '<hr class="thin"><div style="font-size:11px;text-transform:uppercase;color:#4a7a72;letter-spacing:0.06em;margin-bottom:8px">Risks</div>';
      html += riskList(b);
      html += '<hr class="thin"><p style="font-size:12px;color:#4a7a72;line-height:1.6">' + b.summary + '</p>';
      html += '</div>';

      html += '</div>';

      // Analysis box
      const saferName = winner === 'a' ? a.name : b.name;
      const saferScore = winner === 'a' ? a.score : b.score;
      const weakerScore = winner === 'a' ? b.score : a.score;
      const diff = Math.abs(a.score - b.score);
      let note = 'Consider context of use and individual health conditions.';
      if (a.risk === 'High' && b.risk === 'High') note = 'Both products carry high risk — consider safer alternatives.';
      else if (a.risk === 'Low' && b.risk === 'Low') note = 'Both products are relatively safe for typical use.';

      html += '<div class="dyk-card mt-4"><div class="dyk-label">📊 Comparison Analysis</div>';
      html += '<p class="dyk-text"><strong style="color:var(--text)">' + saferName + '</strong> is the safer option with a score of ';
      html += '<strong style="color:var(--neon)">' + saferScore + '/100</strong> vs <strong style="color:var(--danger)">' + weakerScore + '/100</strong>. ';
      html += 'The score difference is <strong style="color:var(--neon)">' + diff + ' points</strong>. ' + note + '</p></div>';

      openModal('⚖️ ' + a.name + ' vs ' + b.name, html);
    }




    /* ---------------------------------------- */
    (function () {
      const canvas = document.getElementById('bg-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let W, H, particles = [];
      function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
      window.addEventListener('resize', resize); resize();
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.5 + 0.3, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.4 + 0.1, color: Math.random() > 0.5 ? '#007a6a' : '#0077cc'
        });
      }
      function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill();
        });
        ctx.globalAlpha = 1;
        for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = '#007a6a';
            ctx.globalAlpha = (1 - dist / 100) * 0.07; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
        requestAnimationFrame(draw);
      }
      draw();
    })();

    /* ---------------------------------------- */
    var dykIdx = 0;
    var dykEl = document.getElementById('home-dyk');
    if (dykEl) dykEl.textContent = DYK_FACTS[0];
    setInterval(function () {
      dykIdx = (dykIdx + 1) % DYK_FACTS.length;
      var el = document.getElementById('home-dyk');
      if (el) {
        el.style.opacity = 0; el.style.transition = 'opacity 0.3s';
        setTimeout(function () { el.textContent = DYK_FACTS[dykIdx]; el.style.opacity = 1; }, 300);
      }
    }, 7000);

    /* ---------------------------------------- */
    function openModal(title, html) {
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-body').innerHTML = html;
      document.getElementById('modal-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModalBtn() {
      document.getElementById('modal-overlay').classList.remove('open');
      document.body.style.overflow = '';
    }
    function closeModal(e) {
      if (e.target === document.getElementById('modal-overlay')) closeModalBtn();
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModalBtn(); });

    /* ---------------------------------------- */
    function launchConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      canvas.style.display = 'block';
      const colors = ['#007a6a', '#0077cc', '#059669', '#5b21b6', '#d97706', '#dc2626'];
      const pieces = Array.from({ length: 110 }, () => ({
        x: Math.random() * canvas.width, y: -20,
        r: Math.random() * 7 + 3, d: Math.random() * 80 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5, tiltAngleInc: 0.07 * (Math.random() + 0.05),
        tiltAngle: 0, angle: 0
      }));
      let frame = 0;
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
          ctx.beginPath(); ctx.lineWidth = p.r / 2; ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 4, p.y); ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4); ctx.stroke();
        });
        pieces.forEach(p => {
          p.angle += 0.01; p.tiltAngle += p.tiltAngleInc;
          p.y += (Math.cos(p.d) + 2 + p.r / 2) * 0.7; p.x += Math.sin(p.angle) * 2; p.tilt = 15 * Math.sin(p.tiltAngle);
        });
        frame++;
        if (frame < 200) requestAnimationFrame(draw);
        else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; }
      }
      draw();
    }

    /* ---------------------------------------- */
    function showSpinner(containerId) {
      const el = document.getElementById(containerId);
      if (!el) return;
      el.style.position = 'relative';
      const s = document.createElement('div');
      s.className = 'spinner-overlay'; s.id = 'spinner-' + containerId;
      s.innerHTML = '<div class="spinner"></div><div class="spinner-txt">ANALYSING...</div>';
      el.appendChild(s);
    }
    function hideSpinner(containerId) {
      const s = document.getElementById('spinner-' + containerId);
      if (s) s.remove();
    }

    /* ---------------------------------------- */
    function animateScore(el, target) {
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const iv = setInterval(function () {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(iv);
      }, 25);
    }

    /* ---------------------------------------- */
    (function () {
      var splashDone = false;
      function hideSplash() {
        if (splashDone) return;
        splashDone = true;
        var el = document.getElementById('intro-splash');
        if (!el) return;
        el.style.transition = 'opacity 0.5s ease';
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        setTimeout(function () {
          el.parentNode && el.parentNode.removeChild(el);
          initScrollReveal();
        }, 550);
      }
      // Primary: hide after 1.5s
      setTimeout(hideSplash, 1500);
      // Backup 1: on window load
      window.addEventListener('load', function () { setTimeout(hideSplash, 300); });
      // Backup 2: click to skip
      document.getElementById('intro-splash').addEventListener('click', hideSplash);
      // Nuclear fallback: force remove after 4s no matter what
      setTimeout(function () {
        var el = document.getElementById('intro-splash');
        if (el) { el.style.display = 'none'; el.parentNode && el.parentNode.removeChild(el); }
      }, 4000);
    })();


    /* ═══════════════════════════════════════════════
       AI CHATBOT
    ═══════════════════════════════════════════════ */
    let chatOpen = false;
    let chatBusy = false;
    const chatHistory = [];

    function toggleChat() {
      chatOpen = !chatOpen;
      document.getElementById('chat-panel').classList.toggle('open', chatOpen);
      if (chatOpen) {
        setTimeout(() => document.getElementById('chat-input').focus(), 300);
        document.getElementById('chat-fab').innerHTML = '✕<div class="chat-badge">AI</div>';
      } else {
        document.getElementById('chat-fab').innerHTML = '🤖<div class="chat-badge">AI</div>';
      }
    }

    function autoResizeChat(el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 90) + 'px';
    }

    function chatKeyDown(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
      }
    }

    function askSuggestion(text) {
      document.getElementById('chat-input').value = text;
      sendChatMessage();
    }

    function appendMessage(role, text) {
      const box = document.getElementById('chat-messages');
      const div = document.createElement('div');
      div.className = 'chat-msg ' + (role === 'user' ? 'user' : 'bot');
      const avatar = document.createElement('div');
      avatar.className = 'msg-avatar ' + (role === 'user' ? 'user-av' : '');
      avatar.textContent = role === 'user' ? '👤' : '⚗️';
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble ' + (role === 'user' ? 'user' : 'bot');
      // Render simple markdown-like formatting
      bubble.innerHTML = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code style="background:rgba(0,150,130,0.1);padding:1px 5px;border-radius:4px;font-size:11px">$1</code>')
        .replace(/\n/g, '<br>');
      div.appendChild(avatar);
      div.appendChild(bubble);
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
      return bubble;
    }

    function showTyping() {
      const box = document.getElementById('chat-messages');
      const div = document.createElement('div');
      div.className = 'chat-msg bot'; div.id = 'typing-indicator';
      div.innerHTML = '<div class="msg-avatar">⚗️</div><div class="msg-bubble bot"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
    }

    function removeTyping() {
      const t = document.getElementById('typing-indicator');
      if (t) t.remove();
    }

    async function sendChatMessage() {
      const input = document.getElementById('chat-input');
      const sendBtn = document.getElementById('chat-send-btn');
      const text = input.value.trim();
      if (!text || chatBusy) return;

      // Clear input
      input.value = '';
      input.style.height = 'auto';
      chatBusy = true;
      sendBtn.disabled = true;

      // Show user message
      appendMessage('user', text);

      // Add to history
      chatHistory.push({ role: 'user', content: text });

      // Show typing
      showTyping();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: `You are ChemBot, an expert AI chemistry assistant built into the ChemSafe Pro platform — a student chemistry project analyzing everyday products like soft drinks, cosmetics, wax, and hair products.

Your role:
- Answer chemistry questions clearly in simple English suitable for high school / college students
- Explain chemical tests (Benedict's, KMnO4, DCPIP, Bromine water, Iodoform, FeCl3, Biuret, Sudan III, Saponification)
- Discuss product safety — soft drinks (Sprite pH 3.24, Diet Coke pH 3.1, Monster pH 3.0), cosmetics (Niacinamide serum, Minoxidil beard serum), wax (paraffin), hair gel, Amul Lassi, hair dye
- Explain pH and its health effects on tooth enamel (critical threshold: pH 5.5)
- Discuss harmful chemicals: benzene formation (sodium benzoate + Vitamin C), Minoxidil cardiovascular risks, PPD in hair dye, VOCs in paraffin wax
- Suggest safer eco-friendly alternatives
- Be concise but thorough. Use bullet points when listing multiple items.
- Add relevant emojis to make responses engaging but not excessive
- If asked about something unrelated to chemistry, gently redirect to chemistry topics`,
            messages: chatHistory
          })
        });

        removeTyping();

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.error?.message || 'API error ' + response.status);
        }

        const data = await response.json();
        const reply = data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';

        // Add assistant reply to history
        chatHistory.push({ role: 'assistant', content: reply });

        // Keep history manageable (last 10 exchanges)
        if (chatHistory.length > 20) chatHistory.splice(0, 2);

        appendMessage('bot', reply);

      } catch (err) {
        removeTyping();
        let errMsg = '⚠️ Could not connect to AI. ';
        if (err.message.includes('401') || err.message.includes('auth')) {
          errMsg += 'Authentication error. Please check API access.';
        } else if (err.message.includes('429')) {
          errMsg += 'Too many requests — please wait a moment and try again.';
        } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errMsg += 'Network error. Please check your internet connection.';
        } else {
          errMsg += err.message;
        }
        appendMessage('bot', errMsg);
      }

      chatBusy = false;
      sendBtn.disabled = false;
      input.focus();
    }

    /* Initial state */
    updatePHMeter(3.5);

    /* ═══════════════════════════════════════════════
       TOAST NOTIFICATIONS
    ═══════════════════════════════════════════════ */
    function showToast(icon, message) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = '<span class="toast-icon">' + icon + '</span><span>' + message + '</span>';
      container.appendChild(toast);
      setTimeout(function () {
        toast.classList.add('exit');
        setTimeout(function () { toast.remove(); }, 300);
      }, 3000);
    }

    // Patch existing analysis to show toast
    var _origRunAnalysis = runAnalysis;
    runAnalysis = function () {
      _origRunAnalysis();
      var val = document.getElementById('ana-input').value.trim();
      if (val && PRODUCTS[val]) {
        setTimeout(function () { showToast('✅', 'Analysis complete for ' + val); }, 1000);
      }
    };

    var _origScoreWax = scoreWax;
    scoreWax = function () {
      _origScoreWax();
      setTimeout(function () { showToast('📊', 'Wax sustainability score calculated!'); }, 900);
    };

    var _origCalcPHRisk = calcPHRisk;
    calcPHRisk = function () {
      _origCalcPHRisk();
      setTimeout(function () { showToast('💧', 'pH risk analysis complete!'); }, 800);
    };

    /* ═══════════════════════════════════════════════
       SCROLL REVEAL (upgraded with IntersectionObserver)
    ═══════════════════════════════════════════════ */
    function initScrollReveal() {
      var revealEls = document.querySelectorAll('.card, .dyk-card, .prof-card, .member-card, .ref-card');
      if (!('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) { el.style.opacity = '1'; });
        return;
      }
      revealEls.forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease ' + (i % 6) * 0.08 + 's, transform 0.5s ease ' + (i % 6) * 0.08 + 's';
      });
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { observer.observe(el); });
    }

    /* ═══════════════════════════════════════════════
       MOLECULAR EXPLORER DATA & LOGIC
    ═══════════════════════════════════════════════ */
    var MOLECULES = {
      'H2O': {
        name: 'Water', formula: 'H₂O', molarMass: '18.015 g/mol',
        bondType: 'Covalent (Polar)', structure: 'Bent / V-shaped',
        atoms: { H: 2, O: 1 },
        uses: ['Universal solvent in chemistry labs', 'Essential for all biological life', 'Used in hydration reactions and dilutions', 'Coolant in industrial processes'],
        fact: 'Water is the only substance that naturally exists in all three states (solid, liquid, gas) on Earth\'s surface. Its bent shape gives it the polarity that makes it the "universal solvent."',
        color: '#00aaff'
      },
      'CO2': {
        name: 'Carbon Dioxide', formula: 'CO₂', molarMass: '44.01 g/mol',
        bondType: 'Covalent (Non-polar)', structure: 'Linear',
        atoms: { C: 1, O: 2 },
        uses: ['Carbonation in soft drinks (Sprite, Coke)', 'Fire extinguishers', 'Photosynthesis reactant', 'Dry ice (solid CO₂) for cooling'],
        fact: 'The fizz in your Sprite is dissolved CO₂! When you open the can, pressure drops and CO₂ escapes as bubbles. CO₂ + H₂O forms carbonic acid (H₂CO₃), making the drink acidic.',
        color: '#ff6b6b'
      },
      'C6H12O6': {
        name: 'Glucose', formula: 'C₆H₁₂O₆', molarMass: '180.16 g/mol',
        bondType: 'Covalent', structure: 'Ring (Pyranose)',
        atoms: { C: 6, H: 12, O: 6 },
        uses: ['Primary energy source for cells', 'Detected by Benedict\'s test (brick red)', 'Found in Sprite, Monster Energy, fruit juice', 'Used in IV drips for medical patients'],
        fact: 'Glucose is the molecule that Benedict\'s test detects! It\'s a "reducing sugar" because it can reduce Cu²⁺ ions to Cu₂O, turning the solution from blue to brick red.',
        color: '#ffa500'
      },
      'NaCl': {
        name: 'Sodium Chloride', formula: 'NaCl', molarMass: '58.44 g/mol',
        bondType: 'Ionic', structure: 'Crystal Lattice (FCC)',
        atoms: { Na: 1, Cl: 1 },
        uses: ['Table salt — food flavoring', 'Saline solution in medicine', 'Electrolyte balance in body', 'De-icing roads in winter'],
        fact: 'A single grain of table salt contains about 1.2 × 10¹⁸ (1.2 quintillion) NaCl formula units! Each Na⁺ is surrounded by 6 Cl⁻ ions in a perfect cubic lattice.',
        color: '#7c3aed'
      },
      'C2H5OH': {
        name: 'Ethanol', formula: 'C₂H₅OH', molarMass: '46.07 g/mol',
        bondType: 'Covalent', structure: 'Chain (with -OH group)',
        atoms: { C: 2, H: 6, O: 1 },
        uses: ['Alcohol in beverages', 'Solvent in cosmetics and serums', 'Antiseptic/disinfectant', 'Detected by Iodoform test (yellow ppt)'],
        fact: 'Ethanol gives a positive Iodoform test — yellow crystalline CHI₃ precipitate. It\'s found in some hair gels and cosmetics as a solvent. The Iodoform test is used to distinguish ethanol from other alcohols.',
        color: '#00d2b4'
      },
      'C6H6': {
        name: 'Benzene', formula: 'C₆H₆', molarMass: '78.11 g/mol',
        bondType: 'Covalent (Aromatic)', structure: 'Planar Hexagonal Ring',
        atoms: { C: 6, H: 6 },
        uses: ['Industrial solvent (restricted)', 'Precursor to many chemicals', 'Found in paraffin wax smoke', 'Can form from sodium benzoate + Vitamin C'],
        fact: 'Benzene is the carcinogen that can form when Sodium Benzoate (in Sprite/Diet Coke) reacts with Vitamin C under heat or UV light. This is one of the most dangerous hidden risks in soft drinks!',
        color: '#dc2626'
      },
      'C6H8O7': {
        name: 'Citric Acid', formula: 'C₆H₈O₇', molarMass: '192.12 g/mol',
        bondType: 'Covalent', structure: 'Chain with 3 -COOH groups',
        atoms: { C: 6, H: 8, O: 7 },
        uses: ['Flavor & preservative in Sprite, Monster', 'pH adjuster in cosmetics', 'Found naturally in citrus fruits', 'Used in esterification reactions'],
        fact: 'Citric acid has THREE carboxylic acid groups (-COOH), making it a triprotic acid. It\'s responsible for the sour taste of Sprite and contributes to its enamel-eroding pH of 3.24.',
        color: '#f59e0b'
      }
    };

    function initMolecules() {
      var sel = document.getElementById('mol-select');
      var btns = document.getElementById('mol-quick-btns');
      Object.keys(MOLECULES).forEach(function (key) {
        var m = MOLECULES[key];
        sel.innerHTML += '<option value="' + key + '">' + m.formula + ' — ' + m.name + '</option>';
        btns.innerHTML += '<button class="btn btn-outline" style="font-size:12px;padding:7px 13px" onclick="selectMolecule(\'' + key + '\')">' + m.formula + '</button>';
      });
    }

    function selectMolecule(key) {
      document.getElementById('mol-select').value = key;
      showMolecule();
    }

    function showMolecule() {
      var key = document.getElementById('mol-select').value;
      if (!key) return;
      var m = MOLECULES[key];

      // Update core label
      document.getElementById('mol-core-label').innerHTML = m.formula;

      // Info chips
      document.getElementById('mol-info-chips').innerHTML =
        '<div class="mol-info-grid">' +
        '<div class="mol-info-chip"><div class="mol-info-label">Formula</div><div class="mol-info-value">' + m.formula + '</div></div>' +
        '<div class="mol-info-chip"><div class="mol-info-label">Molar Mass</div><div class="mol-info-value">' + m.molarMass + '</div></div>' +
        '<div class="mol-info-chip"><div class="mol-info-label">Bond Type</div><div class="mol-info-value" style="font-size:0.7rem">' + m.bondType + '</div></div>' +
        '<div class="mol-info-chip"><div class="mol-info-label">Structure</div><div class="mol-info-value" style="font-size:0.7rem">' + m.structure + '</div></div>' +
        '</div>';

      // Details
      var usesHtml = m.uses.map(function (u) {
        return '<div class="alt-item"><span style="color:var(--neon)">✓</span> ' + u + '</div>';
      }).join('');

      document.getElementById('mol-details').innerHTML =
        '<div style="animation:fadeInUp 0.4s ease">' +
        '<div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;color:var(--neon);margin-bottom:4px">' + m.name + '</div>' +
        '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px">' + m.formula + ' • ' + m.molarMass + '</div>' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:8px">🔬 Real-World Uses</div>' +
        usesHtml + '</div>';

      // Molecule fact
      document.getElementById('mol-fact').textContent = m.fact;

      showToast('🧬', m.name + ' loaded!');
    }

    /* ═══════════════════════════════════════════════
       ELEMENT SPOTLIGHT DATA & LOGIC
    ═══════════════════════════════════════════════ */
    var ELEMENTS = [
      { num: 1, sym: 'H', name: 'Hydrogen', mass: '1.008', type: 'nonmetal', config: '1s¹', compounds: 'H₂O, HCl, H₂SO₄, NH₃', fact: 'Hydrogen makes up 75% of all matter in the universe. It\'s the fuel that powers stars through nuclear fusion.' },
      { num: 6, sym: 'C', name: 'Carbon', mass: '12.011', type: 'nonmetal', config: '1s² 2s² 2p²', compounds: 'CO₂, C₆H₁₂O₆, CH₄, C₆H₆', fact: 'Carbon can form 4 bonds and creates millions of organic compounds. All life on Earth is carbon-based.' },
      { num: 7, sym: 'N', name: 'Nitrogen', mass: '14.007', type: 'nonmetal', config: '1s² 2s² 2p³', compounds: 'NH₃, HNO₃, N₂O, Niacinamide', fact: 'Nitrogen makes up 78% of Earth\'s atmosphere. Niacinamide (Vitamin B3) in your face serum is a nitrogen compound!' },
      { num: 8, sym: 'O', name: 'Oxygen', mass: '15.999', type: 'nonmetal', config: '1s² 2s² 2p⁴', compounds: 'H₂O, CO₂, KMnO₄, NaOH', fact: 'Oxygen is the most abundant element in Earth\'s crust (46%). KMnO₄ test works by donating oxygen to unsaturated compounds.' },
      { num: 11, sym: 'Na', name: 'Sodium', mass: '22.990', type: 'metal', config: '[Ne] 3s¹', compounds: 'NaCl, NaOH, NaHCO₃, Na Benzoate', fact: 'Sodium benzoate (in Sprite) is the Na⁺ salt of benzoic acid. Pure sodium is so reactive it explodes on contact with water!' },
      { num: 12, sym: 'Mg', name: 'Magnesium', mass: '24.305', type: 'metal', config: '[Ne] 3s²', compounds: 'MgO, MgSO₄, MgCl₂, Mg(OH)₂', fact: 'Magnesium burns with a brilliant white flame and is used in fireworks. Mg(OH)₂ is "Milk of Magnesia" — an antacid!' },
      { num: 16, sym: 'S', name: 'Sulfur', mass: '32.06', type: 'nonmetal', config: '[Ne] 3s² 3p⁴', compounds: 'H₂SO₄, SO₂, CuSO₄, FeS₂', fact: 'Sulfur impurities in paraffin wax (1-2%) cause harmful SO₂ emissions when burned. That\'s why eco waxes score higher!' },
      { num: 17, sym: 'Cl', name: 'Chlorine', mass: '35.45', type: 'halogen', config: '[Ne] 3s² 3p⁵', compounds: 'NaCl, HCl, FeCl₃, CHCl₃', fact: 'FeCl₃ (Ferric Chloride) is used in the FeCl₃ test to detect benzoate preservatives and phenols in products!' },
      { num: 19, sym: 'K', name: 'Potassium', mass: '39.098', type: 'metal', config: '[Ar] 4s¹', compounds: 'KMnO₄, KOH, KCl, K Benzoate', fact: 'KMnO₄ (potassium permanganate) is the beautiful purple reagent used to test for unsaturation. K Benzoate is in Diet Coke!' },
      { num: 20, sym: 'Ca', name: 'Calcium', mass: '40.078', type: 'metal', config: '[Ar] 4s²', compounds: 'CaCO₃, Ca(OH)₂, CaCl₂, CaSO₄', fact: 'Tooth enamel is made of hydroxyapatite — Ca₁₀(PO₄)₆(OH)₂. Below pH 5.5, calcium dissolves and enamel erodes irreversibly.' },
      { num: 25, sym: 'Mn', name: 'Manganese', mass: '54.938', type: 'metal', config: '[Ar] 3d⁵ 4s²', compounds: 'KMnO₄, MnO₂, MnSO₄', fact: 'In the KMnO₄ test, Mn⁷⁺ (purple) is reduced to Mn²⁺ (colourless) or MnO₂ (brown), confirming unsaturated compounds.' },
      { num: 26, sym: 'Fe', name: 'Iron', mass: '55.845', type: 'metal', config: '[Ar] 3d⁶ 4s²', compounds: 'FeCl₃, Fe₂O₃, FeSO₄, FeS₂', fact: 'FeCl₃ test produces a buff/red precipitate with sodium benzoate — confirming the controversial preservative in soft drinks!' },
      { num: 29, sym: 'Cu', name: 'Copper', mass: '63.546', type: 'metal', config: '[Ar] 3d¹⁰ 4s¹', compounds: 'CuSO₄, Cu₂O, CuCl₂, Cu(OH)₂', fact: 'Benedict\'s solution contains Cu²⁺ (blue). Reducing sugars convert Cu²⁺ to Cu₂O (brick red) — the colour change you observe!' },
      { num: 30, sym: 'Zn', name: 'Zinc', mass: '65.38', type: 'metal', config: '[Ar] 3d¹⁰ 4s²', compounds: 'ZnO, ZnSO₄, ZnCl₂', fact: 'Zinc is a key ingredient in "The Ordinary Niacinamide + Zinc" serum. It helps regulate sebum production in oily skin.' },
      { num: 35, sym: 'Br', name: 'Bromine', mass: '79.904', type: 'halogen', config: '[Ar] 3d¹⁰ 4s² 4p⁵', compounds: 'Br₂ (aq), HBr, NaBr, CHBr₃', fact: 'Bromine water (orange) decolourises when it reacts with C=C double bonds — this is the Bromine Water Test for unsaturation!' },
      { num: 53, sym: 'I', name: 'Iodine', mass: '126.90', type: 'halogen', config: '[Kr] 4d¹⁰ 5s² 5p⁵', compounds: 'I₂, KI, CHI₃, HI', fact: 'The Iodoform Test uses I₂ + NaOH. If ethanol is present, yellow CHI₃ crystals form — this identifies alcohols in cosmetics!' },
      { num: 14, sym: 'Si', name: 'Silicon', mass: '28.086', type: 'metalloid', config: '[Ne] 3s² 3p²', compounds: 'SiO₂, SiC, Na₂SiO₃', fact: 'Silicon is a metalloid — it can act as both a conductor and insulator. It\'s the backbone of all computer chips!' },
      { num: 15, sym: 'P', name: 'Phosphorus', mass: '30.974', type: 'nonmetal', config: '[Ne] 3s² 3p³', compounds: 'H₃PO₄, ATP, Ca₃(PO₄)₂', fact: 'Phosphoric acid (H₃PO₄) is what makes Diet Coke so acidic (pH 3.1). It\'s literally dissolving tooth enamel with every sip!' },
      { num: 2, sym: 'He', name: 'Helium', mass: '4.003', type: 'noble', config: '1s²', compounds: 'None (noble gas)', fact: 'Helium is so light it escapes Earth\'s gravity! It was first discovered in the sun ("helios" = sun in Greek) before being found on Earth.' },
      { num: 10, sym: 'Ne', name: 'Neon', mass: '20.180', type: 'noble', config: '1s² 2s² 2p⁶', compounds: 'None (noble gas)', fact: 'Neon signs glow orange-red because electrons in neon atoms get excited and release photons at specific wavelengths when current passes through.' }
    ];

    function initElements() {
      var grid = document.getElementById('element-grid');
      grid.innerHTML = '';
      ELEMENTS.forEach(function (el) {
        var typeClass = el.type === 'metal' ? 'el-metal' : el.type === 'nonmetal' ? 'el-nonmetal' : el.type === 'metalloid' ? 'el-metalloid' : el.type === 'noble' ? 'el-noble' : 'el-halogen';
        grid.innerHTML += '<div class="element-cell ' + typeClass + '" onclick="showElement(' + el.num + ')">' +
          '<span class="el-number">' + el.num + '</span>' +
          '<span class="el-symbol">' + el.sym + '</span>' +
          '<span class="el-name">' + el.name + '</span>' +
          '</div>';
      });
    }

    function showElement(num) {
      var el = ELEMENTS.find(function (e) { return e.num === num; });
      if (!el) return;

      var typeLabel = el.type.charAt(0).toUpperCase() + el.type.slice(1);
      var typeClass = el.type === 'metal' ? 'el-metal' : el.type === 'nonmetal' ? 'el-nonmetal' : el.type === 'metalloid' ? 'el-metalloid' : el.type === 'noble' ? 'el-noble' : 'el-halogen';
      var bgColor = el.type === 'metal' ? 'rgba(0,170,255,0.12)' : el.type === 'nonmetal' ? 'rgba(0,210,180,0.12)' : el.type === 'metalloid' ? 'rgba(124,58,237,0.12)' : el.type === 'noble' ? 'rgba(236,72,153,0.12)' : 'rgba(245,158,11,0.12)';
      var fgColor = el.type === 'metal' ? '#00aaff' : el.type === 'nonmetal' ? '#00d2b4' : el.type === 'metalloid' ? '#7c3aed' : el.type === 'noble' ? '#ec4899' : '#f59e0b';

      var html = '<div class="element-detail-card" style="animation:fadeInUp 0.4s ease">' +
        '<div class="element-big-tile" style="background:' + bgColor + ';border:2px solid ' + fgColor + '44;color:' + fgColor + '">' +
        '<div class="el-big-num">' + el.num + '</div>' +
        '<div class="el-big-sym">' + el.sym + '</div>' +
        '<div class="el-big-name">' + el.name + '</div>' +
        '<div class="el-big-mass">' + el.mass + ' u</div>' +
        '</div>' +
        '<div>' +
        '<div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;color:' + fgColor + ';margin-bottom:8px">' + el.name + '</div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">' +
        '<span class="badge" style="background:' + bgColor + ';color:' + fgColor + ';border:1px solid ' + fgColor + '44">' + typeLabel + '</span>' +
        '<span class="badge badge-info">Atomic #' + el.num + '</span>' +
        '</div>' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:4px">⚙️ Electron Config</div>' +
        '<div style="font-family:var(--font-mono);font-size:13px;color:var(--text);margin-bottom:14px">' + el.config + '</div>' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:4px">🧪 Common Compounds</div>' +
        '<div style="font-size:13px;color:var(--text);margin-bottom:14px">' + el.compounds + '</div>' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:4px">💡 Fun Fact</div>' +
        '<p style="font-size:13px;color:var(--text-muted);line-height:1.7">' + el.fact + '</p>' +
        '</div></div>';

      openModal('⚛️ ' + el.sym + ' — ' + el.name, html);
      document.getElementById('element-fact').textContent = el.fact;
      showToast('⚛️', el.name + ' selected!');
    }

    /* ═══════════════════════════════════════════════
       REACTION SIMULATOR DATA & LOGIC
    ═══════════════════════════════════════════════ */
    var REACTIONS = {
      'acid_base': {
        name: 'Acid-Base Neutralization',
        icon: '⚗️',
        reactants: ['HCl', 'NaOH'],
        products: ['NaCl', 'H₂O'],
        equation: 'HCl + NaOH → NaCl + H₂O',
        type: 'Neutralization',
        conditions: 'Room temperature, aqueous solution',
        explanation: 'A strong acid (HCl) reacts with a strong base (NaOH) to produce salt (NaCl) and water. The H⁺ from the acid combines with OH⁻ from the base. The resulting solution is neutral (pH 7).',
        relevance: 'This is how antacids work! Mg(OH)₂ neutralizes excess stomach acid (HCl). pH meter shows the neutralization point.',
        fact: 'When you mix equal moles of HCl and NaOH, the solution reaches exactly pH 7.0 — perfectly neutral! The heat released is called "enthalpy of neutralization" (−57.1 kJ/mol).'
      },
      'combustion': {
        name: 'Combustion of Methane',
        icon: '🔥',
        reactants: ['CH₄', 'O₂'],
        products: ['CO₂', 'H₂O'],
        equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
        type: 'Combustion',
        conditions: 'Ignition source + sufficient O₂',
        explanation: 'Methane (natural gas) burns in excess oxygen to produce carbon dioxide and water. This is a complete combustion reaction — the most efficient energy release from hydrocarbons.',
        relevance: 'Paraffin wax (C₂₀–C₄₀ hydrocarbons) undergoes similar combustion when candles burn, releasing CO₂, H₂O, and harmful VOCs like benzene and toluene.',
        fact: 'Complete combustion of methane releases 890 kJ/mol of energy. Incomplete combustion (limited O₂) produces deadly carbon monoxide (CO) instead — a colourless, odourless killer gas!'
      },
      'esterification': {
        name: 'Esterification',
        icon: '🍇',
        reactants: ['CH₃COOH', 'C₂H₅OH'],
        products: ['CH₃COOC₂H₅', 'H₂O'],
        equation: 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
        type: 'Condensation (Reversible)',
        conditions: 'Concentrated H₂SO₄ catalyst, warm gently',
        explanation: 'A carboxylic acid (acetic acid) reacts with an alcohol (ethanol) to form an ester with a characteristic fruity smell. The acid catalyst provides H⁺ to speed up the reaction.',
        relevance: 'The Esterification Test in our lab confirms presence of carboxylic acids like citric acid (found in Sprite and Monster Energy) by producing a sweet, fruity aroma.',
        fact: 'Different acid + alcohol combinations produce different fruit smells! Ethyl ethanoate smells like nail polish, butyl ethanoate like pineapple, and octyl ethanoate like oranges!'
      },
      'saponification': {
        name: 'Saponification (Soap Making)',
        icon: '🧼',
        reactants: ['Fat/Oil', 'NaOH'],
        products: ['Soap', 'Glycerol'],
        equation: 'Fat + 3NaOH → 3 Soap + Glycerol',
        type: 'Hydrolysis',
        conditions: 'Heat with aqueous NaOH',
        explanation: 'Fats/oils (triglyceride esters) are hydrolysed by NaOH to produce sodium salts of fatty acids (soap) and glycerol. This breaks the ester bonds in the fat molecule.',
        relevance: 'The Saponification Test confirms ester content in waxes and lipid-rich products. Natural waxes like beeswax contain wax esters that react to form soap-like substances.',
        fact: 'Ancient Babylonians made soap 4800 years ago! They heated animal fat with wood ash (which contains KOH). The word "saponification" comes from Latin "sapo" meaning soap.'
      },
      'oxidation': {
        name: 'KMnO₄ Oxidation',
        icon: '💜',
        reactants: ['KMnO₄', 'Alkene (C=C)'],
        products: ['MnO₂', 'Diol (-OH groups)'],
        equation: 'R-CH=CH-R + KMnO₄ → R-CHOH-CHOH-R + MnO₂',
        type: 'Oxidation',
        conditions: 'Cold, dilute, alkaline solution',
        explanation: 'The purple permanganate ion (MnO₄⁻) oxidises the C=C double bond, adding -OH groups across it. The Mn⁷⁺ is reduced to Mn⁴⁺ (brown MnO₂), causing the purple colour to fade.',
        relevance: 'This is the KMnO₄ Test used in our lab! Purple fading to brown/colourless confirms unsaturated compounds in serums and natural oils.',
        fact: 'KMnO₄ is so powerful an oxidizer that it can set fire to glycerol! Drop concentrated KMnO₄ crystals onto glycerol and it ignites spontaneously — a famous chemistry demo!'
      },
      'benedict': {
        name: 'Benedict\'s Reaction',
        icon: '🧪',
        reactants: ['Cu²⁺ (blue)', 'Reducing Sugar'],
        products: ['Cu₂O (red)', 'Oxidised Sugar'],
        equation: 'Cu²⁺ + Reducing Sugar → Cu₂O↓ + Oxidised Sugar',
        type: 'Redox (Reduction-Oxidation)',
        conditions: 'Heat in alkaline solution (Na₂CO₃)',
        explanation: 'Reducing sugars (glucose, lactose, fructose) reduce Cu²⁺ ions (blue) to Cu₂O (brick red precipitate). The sugar is simultaneously oxidised. The colour change: blue → green → yellow → orange → brick red.',
        relevance: 'This is the most important food test in our project! Sprite, Monster Energy, and Amul Lassi all test positive — showing high reducing sugar content.',
        fact: 'The intensity of colour indicates sugar concentration: green = trace, yellow = moderate, brick red = high sugar. Diet Coke tests negative because aspartame is NOT a reducing sugar!'
      },
      'benzene_formation': {
        name: 'Benzene Formation (Dangerous!)',
        icon: '☢️',
        reactants: ['Sodium Benzoate', 'Ascorbic Acid (Vit C)'],
        products: ['Benzene', 'Other products'],
        equation: 'C₆H₅COONa + C₆H₈O₆ → C₆H₆ + CO₂ + ...',
        type: 'Decarboxylation',
        conditions: 'Heat, UV light, acidic pH',
        explanation: 'Sodium benzoate (preservative E211) can react with ascorbic acid (Vitamin C) through decarboxylation to form benzene — a known Group 1 carcinogen linked to leukaemia.',
        relevance: 'This is the most dangerous hidden reaction in Sprite, Diet Coke, and Monster! The FeCl₃ test confirms benzoate presence. This is why these drinks carry high safety risk.',
        fact: 'In 2006, Coca-Cola and Pepsi had to reformulate some drinks when testing revealed benzene levels up to 5x the WHO safe limit for drinking water in certain soft drinks!'
      }
    };

    function initReactions() {
      var sel = document.getElementById('rxn-select');
      var btns = document.getElementById('rxn-quick-btns');
      Object.keys(REACTIONS).forEach(function (key) {
        var r = REACTIONS[key];
        sel.innerHTML += '<option value="' + key + '">' + r.icon + ' ' + r.name + '</option>';
        btns.innerHTML += '<button class="btn btn-outline" style="font-size:12px;padding:7px 13px" onclick="selectReaction(\'' + key + '\')">' + r.icon + ' ' + r.name.split(' ')[0] + '</button>';
      });
    }

    function selectReaction(key) {
      document.getElementById('rxn-select').value = key;
      showReaction();
    }

    function showReaction() {
      var key = document.getElementById('rxn-select').value;
      if (!key) return;
      var r = REACTIONS[key];

      // Equation visualizer
      var eqHtml = '<div class="reaction-display" style="animation:fadeInUp 0.4s ease">';
      eqHtml += '<div class="reaction-equation">';
      r.reactants.forEach(function (rt, i) {
        if (i > 0) eqHtml += '<span class="rxn-part" style="background:transparent;border:none;padding:4px;color:var(--text-muted)">+</span>';
        eqHtml += '<span class="rxn-part rxn-reactant" style="animation-delay:' + (i * 0.1) + 's">' + rt + '</span>';
      });
      eqHtml += '<span class="rxn-arrow">→</span>';
      r.products.forEach(function (pr, i) {
        if (i > 0) eqHtml += '<span class="rxn-part" style="background:transparent;border:none;padding:4px;color:var(--text-muted)">+</span>';
        eqHtml += '<span class="rxn-part rxn-product" style="animation-delay:' + ((r.reactants.length + i) * 0.1) + 's">' + pr + '</span>';
      });
      eqHtml += '</div>';
      eqHtml += '<div class="rxn-type-badge">' + r.icon + ' ' + r.type + '</div>';
      eqHtml += '<div style="margin-top:16px;font-family:var(--font-mono);font-size:13px;color:var(--text-muted);padding:10px;background:rgba(0,150,130,0.04);border-radius:8px;border:1px dashed var(--border)">' + r.equation + '</div>';
      eqHtml += '</div>';
      document.getElementById('rxn-display').innerHTML = eqHtml;

      // Info panel
      var infoHtml = '<div style="animation:fadeInUp 0.4s ease">';
      infoHtml += '<div style="font-family:var(--font-head);font-size:1rem;font-weight:700;color:var(--neon);margin-bottom:12px">' + r.icon + ' ' + r.name + '</div>';
      infoHtml += '<div class="rxn-details">';
      infoHtml += '<div class="rxn-detail-item"><div class="rxn-detail-label">⚗️ Conditions</div><div class="rxn-detail-value">' + r.conditions + '</div></div>';
      infoHtml += '<div class="rxn-detail-item"><div class="rxn-detail-label">🏷️ Reaction Type</div><div class="rxn-detail-value">' + r.type + '</div></div>';
      infoHtml += '</div>';
      infoHtml += '<hr class="thin">';
      infoHtml += '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:6px">📝 Explanation</div>';
      infoHtml += '<p style="font-size:13px;color:var(--text-muted);line-height:1.7;margin-bottom:14px">' + r.explanation + '</p>';
      infoHtml += '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:6px">🔬 Project Relevance</div>';
      infoHtml += '<p style="font-size:13px;color:var(--text-muted);line-height:1.7">' + r.relevance + '</p>';
      infoHtml += '</div>';
      document.getElementById('rxn-info').innerHTML = infoHtml;

      // Did you know
      document.getElementById('rxn-dyk').style.display = 'block';
      document.getElementById('rxn-fact').textContent = r.fact;

      showToast('🔄', r.name + ' loaded!');
    }

    /* Init new sections on first visit */
    var _molInit = false, _elInit = false, _rxnInit = false;
    var _origShowSection = showSection;
    showSection = function (id) {
      _origShowSection(id);
      if (id === 'molecules' && !_molInit) { initMolecules(); _molInit = true; }
      if (id === 'elements' && !_elInit) { initElements(); _elInit = true; }
      if (id === 'reactions' && !_rxnInit) { initReactions(); _rxnInit = true; }
    };

    /* ═══════════════════════════════════════════════
       INITIALIZATION & DARK MODE
    ═══════════════════════════════════════════════ */
    function toggleDarkMode() {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      document.getElementById('dark-toggle').innerText = isDark ? '🌙' : '☀️';
    }

    document.addEventListener('DOMContentLoaded', function () {
      // Load saved theme
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        const toggleBtn = document.getElementById('dark-toggle');
        if (toggleBtn) toggleBtn.innerText = '🌙';
      }
    });

  
