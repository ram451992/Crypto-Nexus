// config.js
export const medicalKeywords = [
    // General terms
    'symptom', 'diagnosis', 'treatment', 'medicine', 'health', 'disease',
    'medication', 'therapy', 'surgery', 'hospital', 'clinic',
    
    // Medical professionals
    'pediatrician', 'cardiologist', 'dermatologist', 'neurologist',
    'oncologist', 'physiotherapist', 'radiologist', 'immunologist',
    
    // Preventive and chronic care
    'preventive care', 'chronic disease', 'acute illness',
    'pain management', 'mental health', 'nutrition', 'dietary therapy',
    
    // Mental health conditions
    'anxiety', 'depression', 'stress management', 'PTSD', 'bipolar disorder',
    'schizophrenia', 'obsessive-compulsive disorder', 'ADHD', 'insomnia',
    
    // Common conditions
    'hypertension', 'diabetes', 'asthma', 'allergy', 'infection', 'obesity',
    'arthritis', 'osteoporosis', 'fibromyalgia', 'chronic fatigue syndrome',
    
    // Medications and treatments
    'antibiotic', 'antidepressant', 'analgesic', 'chemotherapy', 'radiation',
    'insulin', 'pain reliever', 'antiviral', 'steroids', 'anticoagulant',
    'immunotherapy', 'antihistamine', 'anesthesia', 'sedative',
    
    // Clinical settings and tools
    'urgent care', 'emergency room', 'family medicine', 'internal medicine',
    'telemedicine', 'virtual care', 'health insurance', 'medical billing',
    
    // Diagnostics
    'X-ray', 'MRI', 'CT scan', 'ultrasound', 'blood test', 'biopsy',
    'EKG', 'electroencephalogram', 'colonoscopy', 'endoscopy', 'mammogram',
    'screening test', 'imaging test', 'urinalysis', 'spinal tap', 'swab test',
    
    // Surgical procedures
    'appendectomy', 'hysterectomy', 'bypass surgery', 'organ transplant',
    'angioplasty', 'laparoscopy', 'mastectomy', 'knee replacement',
    'hip replacement', 'cataract surgery', 'cosmetic surgery',
    
    // Common symptoms
    'cough', 'fever', 'nausea', 'vomiting', 'fatigue', 'shortness of breath',
    'chest pain', 'dizziness', 'headache', 'muscle pain', 'joint pain',
    'rash', 'itching', 'swelling', 'stomach pain', 'diarrhea', 'constipation',
    'back pain', 'weight loss', 'weight gain', 'loss of appetite',
    
    // Infectious diseases
    'COVID-19', 'influenza', 'HIV/AIDS', 'tuberculosis', 'hepatitis',
    'malaria', 'dengue fever', 'measles', 'mumps', 'chickenpox', 'polio',
    'rabies', 'Ebola', 'Lyme disease', 'cholera', 'Zika virus',
    
    // Chronic diseases
    'cancer', 'heart disease', 'COPD', 'stroke', 'liver disease',
    'kidney disease', 'Alzheimer’s disease', 'Parkinson’s disease',
    'multiple sclerosis', 'epilepsy', 'sickle cell anemia', 'cystic fibrosis',
    
    // Body systems
    'cardiovascular system', 'respiratory system', 'digestive system',
    'nervous system', 'musculoskeletal system', 'immune system',
    'endocrine system', 'urinary system', 'reproductive system',
    'integumentary system', 'lymphatic system', 'skeletal system',
    
    // Medical specialties
    'gastroenterology', 'urology', 'orthopedics', 'rheumatology',
    'endocrinology', 'pulmonology', 'infectious disease', 'hematology',
    'nephrology', 'gynecology', 'oncology', 'ophthalmology', 'otolaryngology',
    'geriatrics', 'podiatry', 'allergy and immunology',
    
    // Symptoms and assessments
    'chronic pain', 'acute pain', 'palliative care', 'risk factors',
    'BMI', 'blood pressure', 'heart rate', 'cholesterol', 'metabolic panel',
    
    // Women’s health
    'pregnancy', 'menopause', 'birth control', 'fertility', 'prenatal care',
    'postnatal care', 'cervical cancer', 'breast cancer', 'gynecologic exam',
    
    // Men's health
    'prostate cancer', 'erectile dysfunction', 'testicular cancer',
    
    // Pediatrics
    'pediatric care', 'vaccination', 'growth chart', 'neonatal care',
    
    // Geriatrics
    'dementia', 'Alzheimer’s care', 'osteoporosis', 'falls prevention',
    'geriatric assessment', 'elder care',
    
    // Neurological conditions
    'migraine', 'seizure', 'neuropathy', 'ALS', 'Huntington’s disease',
    'autism spectrum disorder', 'cerebral palsy', 'spinal cord injury',
    
    // Dermatology
    'acne', 'eczema', 'psoriasis', 'rosacea', 'skin cancer', 'melanoma',
    'dermatitis', 'hives', 'alopecia', 'sunburn', 'scabies',
    
    // Cardiovascular diseases
    'arrhythmia', 'hypertension', 'high cholesterol', 'atherosclerosis',
    'heart failure', 'coronary artery disease', 'myocardial infarction',
    
    // Respiratory conditions
    'asthma attack', 'bronchitis', 'pneumonia', 'emphysema', 'sleep apnea',
    'pulmonary embolism', 'cystic fibrosis', 'interstitial lung disease',
    
    // Autoimmune diseases
    'lupus', 'rheumatoid arthritis', 'Crohn’s disease', 'ulcerative colitis',
    'Graves’ disease', 'Hashimoto’s thyroiditis', 'Sjögren’s syndrome',
    
    // Gastrointestinal issues
    'irritable bowel syndrome', 'GERD', 'peptic ulcer', 'colitis',
    'celiac disease', 'lactose intolerance', 'gallstones', 'hepatitis',
    
    // Endocrine disorders
    'thyroid disease', 'diabetes mellitus', 'hypothyroidism', 'Addison’s disease',
    'Cushing’s syndrome', 'PCOS', 'hyperthyroidism', 'adrenal insufficiency',
    
    // Musculoskeletal disorders
    'carpal tunnel syndrome', 'scoliosis', 'tendinitis', 'bursitis',
    'sprain', 'strain', 'ligament injury', 'bone fracture', 'spinal stenosis',
    
    // Public health and epidemiology
    'epidemiology', 'pandemic', 'outbreak', 'public health policy', 'quarantine',
    
    // Pain management
    'analgesia', 'opioids', 'nerve block', 'spinal cord stimulation',
    
    // Mental health treatments
    'cognitive behavioral therapy', 'psychiatry', 'psychotherapy', 
    'counseling', 'rehabilitation',
    
    // Nutritional terms
    'dietitian', 'calories', 'vitamins', 'minerals', 'fiber', 'protein',
    
    // Medical emergencies
    'shock', 'trauma', 'burn', 'bleeding', 'poisoning', 'choking',
    
    // Reproductive health
    'STD', 'HIV', 'sexual health', 'contraception', 'infertility treatment',
    
    // Health metrics and assessments
    'risk factors', 'blood sugar', 'cholesterol levels', 'EKG results',
    
    // Research-related terms
    'clinical trial', 'meta-analysis', 'double-blind study', 'placebo',
    'case study', 'epidemiological study',
    
    // Miscellaneous terms
    'vaccination', 'pandemic response', 'immunization', 'wellness check',
    'screening', 'lifestyle modification', 'disease prevention'
];
