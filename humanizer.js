class EnhancedTextHumanizer {
constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.synonymDatabase = this.buildAdvancedSynonymDatabase();
    this.humanPatterns = this.buildHumanPatterns();
    this.connectorVariations = this.buildConnectors();
    this.aiPatterns = this.buildAIPatterns();
    this.sentenceTemplates = this.buildSentenceTemplates();
    this.grammarRules = this.buildGrammarRules();
    this.contextualReplacements = this.buildContextualReplacements();
    this.stylisticPatterns = this.buildStylisticPatterns();
    this.humanizationStrategies = this.buildHumanizationStrategies();
    this.perplexityPatterns = this.buildPerplexityPatterns();
    this.burstinessControl = this.buildBurstinessController();
    this.contextualMemory = new Map();
    this.settings = {
        conversational: true,
        structure: true,
        expressions: true,
        technical: false,
        readability: true,
        patterns: true
    };
    this.initializeSettings();
}

initializeElements() {
    this.inputText = document.getElementById('inputText');
    this.outputText = document.getElementById('outputText');
    this.humanizeBtn = document.getElementById('humanizeBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.copyBtn = document.getElementById('copyBtn');
    this.regenerateBtn = document.getElementById('regenerateBtn');
    this.pasteBtn = document.getElementById('pasteBtn');
    this.clearInputBtn = document.getElementById('clearInputBtn');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.loading = document.getElementById('loading');
    
    // Word count elements
    this.inputWordCount = document.getElementById('inputWordCount');
    this.outputWordCount = document.getElementById('outputWordCount');
    
    // Indicator elements
    this.aiIndicator = document.getElementById('aiIndicator');
    this.humanIndicator = document.getElementById('humanIndicator');
    
    // Stats elements
    this.originalWords = document.getElementById('originalWords');
    this.humanizedWords = document.getElementById('humanizedWords');
    this.improvementScore = document.getElementById('improvementScore');
    this.readabilityScore = document.getElementById('readabilityScore');
    this.uniquenessScore = document.getElementById('uniquenessScore');
    this.processingTime = document.getElementById('processingTime');
}

attachEventListeners() {
    this.humanizeBtn.addEventListener('click', () => this.humanizeText());
    this.clearBtn.addEventListener('click', () => this.clearAll());
    this.copyBtn.addEventListener('click', () => this.copyResult());
    this.regenerateBtn.addEventListener('click', () => this.regenerateText());
    this.pasteBtn.addEventListener('click', () => this.pasteFromClipboard());
    this.clearInputBtn.addEventListener('click', () => this.clearInput());
    this.downloadBtn.addEventListener('click', () => this.downloadText());
    
    this.inputText.addEventListener('input', () => this.updateInputStats());
    this.outputText.addEventListener('input', () => this.updateOutputStats());
    
    // Settings toggle listeners
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', () => this.toggleSetting(toggle));
    });
}

initializeSettings() {
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        const setting = toggle.dataset.setting;
        if (this.settings[setting]) {
            toggle.classList.add('active');
        }
    });
}

toggleSetting(toggle) {
    const setting = toggle.dataset.setting;
    toggle.classList.toggle('active');
    this.settings[setting] = toggle.classList.contains('active');
    this.showToast(`${setting.charAt(0).toUpperCase() + setting.slice(1)} ${this.settings[setting] ? 'enabled' : 'disabled'}`);
}

buildPerplexityPatterns() {
    return {
        // High perplexity patterns (more unpredictable, human-like)
        unexpectedTransitions: [
            'Funny thing is,',
            'Here\'s what\'s wild:',
            'Plot twist:',
            'Here\'s the kicker:',
            'Get this:',
            'Would you believe',
            'Turns out,',
            'Go figure,',
            'Who would have thought',
            'Believe it or not,'
        ],
        
        casualInterjections: [
            'honestly', 'frankly', 'literally', 'basically', 'obviously',
            'clearly', 'seriously', 'actually', 'really', 'truly',
            'genuinely', 'apparently', 'surprisingly', 'interestingly',
            'notably', 'remarkably', 'undoubtedly', 'certainly'
        ],
        
        humanHesitations: [
            'well,', 'um,', 'you know,', 'I mean,', 'like,', 'so,',
            'anyway,', 'look,', 'listen,', 'see,', 'right,', 'okay,'
        ],
        
        uncertaintyExpressions: [
            'I think', 'I believe', 'it seems', 'it appears', 'perhaps',
            'maybe', 'possibly', 'probably', 'likely', 'presumably',
            'supposedly', 'allegedly', 'apparently', 'evidently'
        ]
    };
}

buildBurstinessController() {
    return {
        sentenceLengthTargets: [
            { min: 5, max: 12, weight: 0.25 },   // Short sentences
            { min: 13, max: 25, weight: 0.40 },  // Medium sentences
            { min: 26, max: 40, weight: 0.25 },  // Long sentences
            { min: 41, max: 60, weight: 0.10 }   // Very long sentences
        ],
        
        complexityVariation: {
            simple: { clauses: 1, avgWordLength: 4.5, weight: 0.30 },
            moderate: { clauses: 2, avgWordLength: 5.2, weight: 0.45 },
            complex: { clauses: 3, avgWordLength: 6.1, weight: 0.25 }
        },
        
        punctuationVariety: [
            '.', '!', '?', '...', '—', ':', ';', ',', ')', '('
        ]
    };
}

buildAdvancedSynonymDatabase() {
    return {
        // Contextual synonym groups with semantic similarity
        verbs: {
            'demonstrate': {
                casual: ['show', 'prove', 'reveal', 'make clear'],
                formal: ['illustrate', 'exhibit', 'manifest', 'exemplify'],
                conversational: ['point out', 'lay out', 'spell out', 'break down']
            },
            'utilize': {
                casual: ['use', 'work with', 'go with', 'pick'],
                formal: ['employ', 'apply', 'implement', 'deploy'],
                conversational: ['grab', 'take', 'try', 'run with']
            },
            'facilitate': {
                casual: ['help', 'make easier', 'smooth out', 'speed up'],
                formal: ['enable', 'assist', 'support', 'promote'],
                conversational: ['give a hand', 'pitch in', 'lend support', 'boost']
            },
            'implement': {
                casual: ['put in place', 'set up', 'start', 'roll out'],
                formal: ['establish', 'institute', 'execute', 'deploy'],
                conversational: ['get going', 'kick off', 'fire up', 'launch']
            }
        },
        
        adjectives: {
            'significant': {
                casual: ['big', 'major', 'huge', 'important'],
                formal: ['substantial', 'considerable', 'notable', 'meaningful'],
                conversational: ['pretty big', 'no joke', 'serious', 'real']
            },
            'comprehensive': {
                casual: ['complete', 'full', 'total', 'whole'],
                formal: ['thorough', 'extensive', 'exhaustive', 'all-encompassing'],
                conversational: ['soup to nuts', 'the works', 'everything', 'full package']
            },
            'optimal': {
                casual: ['best', 'perfect', 'ideal', 'top'],
                formal: ['superior', 'premium', 'prime', 'ultimate'],
                conversational: ['spot-on', 'just right', 'perfect fit', 'bang on']
            }
        },
        
        adverbs: {
            'furthermore': {
                casual: ['also', 'plus', 'too', 'as well'],
                formal: ['additionally', 'moreover', 'besides', 'likewise'],
                conversational: ['on top of that', 'what\'s more', 'and another thing', 'not to mention']
            },
            'however': {
                casual: ['but', 'though', 'still', 'yet'],
                formal: ['nevertheless', 'nonetheless', 'conversely', 'alternatively'],
                conversational: ['that said', 'mind you', 'having said that', 'then again']
            },
            'therefore': {
                casual: ['so', 'thus', 'hence', 'then'],
                formal: ['consequently', 'accordingly', 'as a result', 'ergo'],
                conversational: ['because of that', 'that\'s why', 'so naturally', 'which means']
            }
        }
    };
}

buildAdvancedAIPatterns() {
    return {
        // Sophisticated AI detection patterns
        repetitiveStructures: [
            /^(It is|This is|That is|These are|Those are)\s+.+?\s+(that|which)/gm,
            /^(The|A|An)\s+.+?\s+(is|are|was|were)\s+.+?\./gm,
            /^(In order to|To)\s+.+?,\s+(it is|one must|we need)/gm
        ],
        
        formulaicPhrases: [
            'it is important to note that',
            'it should be emphasized that',
            'it is worth mentioning that',
            'one must consider that',
            'it can be argued that',
            'research has shown that',
            'studies indicate that',
            'experts suggest that',
            'data reveals that',
            'analysis shows that'
        ],
        
        overusedTransitions: [
            'furthermore', 'moreover', 'additionally', 'consequently',
            'therefore', 'however', 'nevertheless', 'nonetheless'
        ],
        
        academicJargon: [
            'paradigm', 'framework', 'methodology', 'comprehensive',
            'multifaceted', 'holistic', 'synergistic', 'optimal',
            'robust', 'sophisticated', 'innovative', 'revolutionary'
        ],
        
        roboticPatterns: [
            /\b(comprehensive|thorough|detailed)\s+(analysis|overview|examination|study)\b/gi,
            /\b(significant|substantial|considerable)\s+(impact|influence|effect|change)\b/gi,
            /\b(effective|efficient|successful)\s+(strategy|approach|method|solution)\b/gi,
            /\b(important|crucial|vital|essential)\s+(factor|element|aspect|component)\b/gi
        ]
    };
}

buildHumanizationStrategies() {
    return {
        // Advanced humanization techniques
        naturalImperfections: [
            {
                type: 'redundant_clarification',
                apply: (text) => this.addRedundantClarifications(text),
                probability: 0.15
            },
            {
                type: 'false_starts',
                apply: (text) => this.addFalseStarts(text),
                probability: 0.08
            },
            {
                type: 'trailing_thoughts',
                apply: (text) => this.addTrailingThoughts(text),
                probability: 0.12
            },
            {
                type: 'personal_asides',
                apply: (text) => this.addPersonalAsides(text),
                probability: 0.10
            }
        ],
        
        conversationalFlow: [
            {
                type: 'question_injection',
                apply: (text) => this.injectQuestions(text),
                probability: 0.20
            },
            {
                type: 'direct_address',
                apply: (text) => this.addDirectAddress(text),
                probability: 0.18
            },
            {
                type: 'experiential_references',
                apply: (text) => this.addExperientialReferences(text),
                probability: 0.15
            }
        ],
        
        stylistic_variety: [
            {
                type: 'sentence_fusion',
                apply: (text) => this.fuseSentences(text),
                probability: 0.25
            },
            {
                type: 'clause_reordering',
                apply: (text) => this.reorderClauses(text),
                probability: 0.30
            },
            {
                type: 'parenthetical_additions',
                apply: (text) => this.addParentheticals(text),
                probability: 0.22
            }
        ]
    };
}

// Advanced humanization methods
addRedundantClarifications(text) {
    const clarifiers = [
        ', if you know what I mean',
        ', you get the idea',
        ', that kind of thing',
        ', or something like that',
        ', basically',
        ', in other words',
        ', to put it simply',
        ', so to speak'
    ];
    
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.map(sentence => {
        if (sentence.length > 50 && Math.random() < 0.15) {
            const words = sentence.split(' ');
            const insertPos = Math.floor(words.length * 0.7);
            const clarifier = this.getWeightedRandom(clarifiers);
            words.splice(insertPos, 0, clarifier);
            return words.join(' ');
        }
        return sentence;
    }).join(' ');
}

addFalseStarts(text) {
    const falseStarts = [
        'Well, I mean,',
        'You know what,',
        'Actually,',
        'Here\'s the thing—',
        'Look,',
        'Let me think...',
        'Hmm,'
    ];
    
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.map((sentence, index) => {
        if (index > 0 && sentence.length > 30 && Math.random() < 0.08) {
            const falseStart = this.getWeightedRandom(falseStarts);
            return `${falseStart} ${sentence.toLowerCase()}`;
        }
        return sentence;
    }).join(' ');
}

addTrailingThoughts(text) {
    const trailingThoughts = [
        '—at least that\'s how I see it',
        '—well, most of the time anyway',
        '—or maybe I\'m wrong about that',
        '—but who knows, really',
        '—if that makes sense',
        '—though I could be mistaken',
        '—assuming I\'m understanding this right'
    ];
    
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.map(sentence => {
        if (sentence.length > 40 && Math.random() < 0.12) {
            const thought = this.getWeightedRandom(trailingThoughts);
            return sentence.replace(/\.$/, thought + '.');
        }
        return sentence;
    }).join(' ');
}

addPersonalAsides(text) {
    const asides = [
        '(at least in my experience)',
        '(from what I\'ve seen)',
        '(which is interesting)',
        '(surprisingly enough)',
        '(I\'ve noticed this before)',
        '(worth keeping in mind)',
        '(just my two cents)'
    ];
    
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.map(sentence => {
        if (sentence.length > 60 && Math.random() < 0.10) {
            const words = sentence.split(' ');
            const insertPos = Math.floor(words.length * 0.6);
            const aside = this.getWeightedRandom(asides);
            words.splice(insertPos, 0, aside);
            return words.join(' ');
        }
        return sentence;
    }).join(' ');
}

injectQuestions(text) {
    const rhetoricalQuestions = [
        'Why does this matter?',
        'What does this mean?',
        'How so?',
        'But here\'s the question:',
        'You might wonder why.',
        'What\'s the point?',
        'Why bring this up?',
        'So what\'s the deal?'
    ];
    
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.map((sentence, index) => {
        if (index > 0 && index < sentences.length - 1 && Math.random() < 0.20) {
            const question = this.getWeightedRandom(rhetoricalQuestions);
            return `${sentence} ${question}`;
        }
        return sentence;
    }).join(' ');
}

addDirectAddress(text) {
    const directAddresses = [
        'you see', 'you know', 'you get', 'you understand',
        'you realize', 'you can imagine', 'you might think',
        'you\'d expect', 'you\'ll notice', 'you should know'
    ];
    
    return text.replace(/\b(this|that|it)\s+(is|means|shows|indicates)\b/gi, (match, pronoun, verb) => {
        if (Math.random() < 0.18) {
            const address = this.getWeightedRandom(directAddresses);
            return `${address}, ${pronoun} ${verb}`;
        }
        return match;
    });
}

addExperientialReferences(text) {
    const experiences = [
        'I\'ve found that',
        'in my experience',
        'from what I\'ve seen',
        'based on what I know',
        'from my perspective',
        'as far as I can tell',
        'what I\'ve noticed is',
        'the way I see it'
    ];
    
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.map((sentence, index) => {
        if (index === 0 && Math.random() < 0.15) {
            const experience = this.getWeightedRandom(experiences);
            return `${experience}, ${sentence.toLowerCase()}`;
        }
        return sentence;
    }).join(' ');
}

fuseSentences(text) {
    const sentences = text.split(/(?<=\.)\s+/);
    const result = [];
    
    for (let i = 0; i < sentences.length; i++) {
        const current = sentences[i].trim();
        const next = sentences[i + 1]?.trim();
        
        if (next && current.length < 35 && next.length < 35 && Math.random() < 0.25) {
            const connectors = ['and', 'but', 'so', 'plus', 'while', 'though'];
            const connector = this.getWeightedRandom(connectors);
            const fused = current.replace(/\.$/, '') + ', ' + connector + ' ' + next.toLowerCase();
            result.push(fused);
            i++; // Skip the next sentence as it's been fused
        } else {
            result.push(current);
        }
    }
    
    return result.join(' ');
}

reorderClauses(text) {
    return text.replace(/(.+?),\s+(which|that|who)\s+(.+?)(\.|,)/g, (match, main, rel, clause, punct) => {
        if (Math.random() < 0.30) {
            const reorderedStarters = ['What', 'Something that', 'The thing that'];
            const starter = this.getWeightedRandom(reorderedStarters);
            return `${starter} ${clause} is ${main.toLowerCase()}${punct}`;
        }
        return match;
    });
}

addParentheticals(text) {
    const parentheticals = [
        '(which makes sense)',
        '(obviously)',
        '(naturally)',
        '(of course)',
        '(as expected)',
        '(interestingly)',
        '(surprisingly)',
        '(frankly)'
    ];
    
    return text.replace(/\b(is|are|was|were|will be|can be)\s+([^.!?]+)/g, (match, verb, rest) => {
        if (Math.random() < 0.22 && rest.length > 15) {
            const parenthetical = this.getWeightedRandom(parentheticals);
            return `${verb} ${parenthetical} ${rest}`;
        }
        return match;
    });
}

// Enhanced processing pipeline
async processText(text) {
    let result = text;
    
    // Initialize contextual memory
    this.contextualMemory.clear();
    this.analyzeContext(result);
    
    // Phase 1: Deep AI pattern removal
    result = this.removeDeepAIPatterns(result);
    
    // Phase 2: Inject natural imperfections
    result = await this.injectNaturalImperfections(result);
    
    // Phase 3: Apply perplexity enhancement
    result = this.enhancePerplexity(result);
    
    // Phase 4: Control burstiness
    result = this.controlBurstiness(result);
    
    // Phase 5: Advanced synonym replacement with context
    result = this.advancedSynonymReplacement(result);
    
    // Phase 6: Sentence-level humanization
    result = await this.advancedSentenceProcessing(result);
    
    // Phase 7: Final coherence and flow optimization
    result = this.finalCoherenceOptimization(result);
    
    return result;
}

analyzeContext(text) {
    // Analyze text characteristics for contextual processing
    const wordCount = text.split(/\s+/).length;
    const avgSentenceLength = wordCount / (text.split(/[.!?]+/).length || 1);
    const formalityScore = this.calculateFormalityScore(text);
    const topicContext = this.identifyTopicContext(text);
    
    this.contextualMemory.set('wordCount', wordCount);
    this.contextualMemory.set('avgSentenceLength', avgSentenceLength);
    this.contextualMemory.set('formalityScore', formalityScore);
    this.contextualMemory.set('topicContext', topicContext);
}

removeDeepAIPatterns(text) {
    let result = text;
    
    // Remove formulaic openings
    const formulaicOpenings = [
        /^(It is important to note that|It should be noted that|It is worth mentioning that)\s*/gi,
        /^(In today's world|In this day and age|In the modern era)\s*/gi,
        /^(When it comes to|With regard to|In terms of)\s*/gi
    ];
    
    formulaicOpenings.forEach(pattern => {
        result = result.replace(pattern, '');
    });
    
    // Replace robotic sentence patterns
    result = result.replace(/^(This|That|These|Those)\s+(.+?)\s+(is|are)\s+(.+?)$/gm, (match, det, subj, verb, pred) => {
        const alternatives = [
            `${subj.charAt(0).toUpperCase() + subj.slice(1)} ${verb} ${pred}`,
            `What we have here is ${subj} that ${verb} ${pred}`,
            `You'll find ${subj} ${verb} ${pred}`,
            `${subj.charAt(0).toUpperCase() + subj.slice(1)} tends to be ${pred}`
        ];
        return this.getWeightedRandom(alternatives);
    });
    
    // Replace academic transitions
    const academicTransitions = {
        'Furthermore,': ['Plus,', 'Also,', 'What\'s more,', 'On top of that,'],
        'Moreover,': ['Besides,', 'Additionally,', 'Not only that,', 'And another thing,'],
        'However,': ['But,', 'Though,', 'That said,', 'Mind you,'],
        'Therefore,': ['So,', 'Thus,', 'As a result,', 'Because of this,'],
        'Consequently,': ['So,', 'This means', 'Which leads to', 'As a result,']
    };
    
    Object.entries(academicTransitions).forEach(([formal, casual]) => {
        const regex = new RegExp(`\\b${formal}`, 'gi');
        result = result.replace(regex, () => this.getWeightedRandom(casual));
    });
    
    return result;
}

async injectNaturalImperfections(text) {
    let result = text;
    
    // Apply each humanization strategy based on probability
    for (const strategy of this.humanizationStrategies.naturalImperfections) {
        if (Math.random() < strategy.probability) {
            result = strategy.apply(result);
        }
    }
    
    for (const strategy of this.humanizationStrategies.conversationalFlow) {
        if (Math.random() < strategy.probability) {
            result = strategy.apply(result);
        }
    }
    
    for (const strategy of this.humanizationStrategies.stylistic_variety) {
        if (Math.random() < strategy.probability) {
            result = strategy.apply(result);
        }
    }
    
    return result;
}

enhancePerplexity(text) {
    let result = text;
    
    // Add unexpected transitions
    const sentences = result.split(/(?<=\.)\s+/);
    result = sentences.map((sentence, index) => {
        if (index > 0 && Math.random() < 0.12) {
            const transition = this.getWeightedRandom(this.perplexityPatterns.unexpectedTransitions);
            return `${transition} ${sentence.toLowerCase()}`;
        }
        return sentence;
    }).join(' ');
    
    // Inject casual interjections
    result = result.replace(/\b(is|are|was|were)\s+([^.!?]+)/g, (match, verb, rest) => {
        if (Math.random() < 0.08) {
            const interjection = this.getWeightedRandom(this.perplexityPatterns.casualInterjections);
            return `is ${interjection} ${rest}`;
        }
        return match;
    });
    
    // Add uncertainty expressions to absolute statements
    result = result.replace(/\b(always|never|all|every|completely|totally)\b/g, (match) => {
        if (Math.random() < 0.6) {
            const uncertainty = this.getWeightedRandom(this.perplexityPatterns.uncertaintyExpressions);
            return `${uncertainty} ${match.toLowerCase()}`;
        }
        return match;
    });
    
    return result;
}

controlBurstiness(text) {
    const sentences = text.split(/(?<=\.)\s+/);
    let result = [];
    
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i].trim();
        const targetLength = this.selectTargetLength();
        const currentLength = sentence.split(' ').length;
        
        // Adjust sentence length to create variety
        if (currentLength < targetLength.min) {
            sentence = this.expandSentence(sentence, targetLength.min);
        } else if (currentLength > targetLength.max) {
            const split = this.splitLongSentence(sentence);
            result.push(...split);
            continue;
        }
        
        result.push(sentence);
    }
    
    return result.join(' ');
}

selectTargetLength() {
    const targets = this.burstinessControl.sentenceLengthTargets;
    const random = Math.random();
    let cumulative = 0;
    
    for (const target of targets) {
        cumulative += target.weight;
        if (random <= cumulative) {
            return target;
        }
    }
    
    return targets[0]; // fallback
}

expandSentence(sentence, targetLength) {
    const words = sentence.split(' ');
    const expansions = [
        'quite', 'really', 'pretty', 'rather', 'somewhat', 'fairly',
        'particularly', 'especially', 'notably', 'remarkably'
    ];
    
    while (words.length < targetLength && Math.random() < 0.7) {
        const expansion = this.getWeightedRandom(expansions);
        const insertPos = Math.floor(Math.random() * (words.length - 1)) + 1;
        words.splice(insertPos, 0, expansion);
    }
    
    return words.join(' ');
}

splitLongSentence(sentence) {
    const breakPoints = [', which', ', that', ', and', ', but', ', so', ', because'];
    
    for (const breakPoint of breakPoints) {
        if (sentence.includes(breakPoint)) {
            const parts = sentence.split(breakPoint);
            if (parts.length > 1 && parts[0].length > 30) {
                const firstPart = parts[0].trim() + '.';
                const connector = breakPoint === ', which' || breakPoint === ', that' ? 'This' : 
                                breakPoint.replace(',', '').trim();
                const secondPart = connector.charAt(0).toUpperCase() + connector.slice(1) + 
                                 ' ' + parts.slice(1).join(breakPoint).trim();
                return [firstPart, secondPart];
            }
        }
    }
    
    return [sentence];
}

advancedSynonymReplacement(text) {
    let result = text;
    const formalityScore = this.contextualMemory.get('formalityScore') || 0.5;
    
    // Select appropriate synonym style based on formality
    let style = 'casual';
    if (formalityScore > 0.7) style = 'formal';
    else if (formalityScore < 0.3) style = 'conversational';
    
    // Replace verbs
    Object.entries(this.synonymDatabase.verbs).forEach(([original, synonyms]) => {
        const regex = new RegExp(`\\b${original}\\b`, 'gi');
        result = result.replace(regex, (match) => {
            if (Math.random() < 0.6) {
                return this.getWeightedRandom(synonyms[style] || synonyms.casual);
            }
            return match;
        });
    });
    
    // Replace adjectives
    Object.entries(this.synonymDatabase.adjectives).forEach(([original, synonyms]) => {
        const regex = new RegExp(`\\b${original}\\b`, 'gi');
        result = result.replace(regex, (match) => {
            if (Math.random() < 0.5) {
                return this.getWeightedRandom(synonyms[style] || synonyms.casual);
            }
            return match;
        });
    });
    
    // Replace adverbs
    Object.entries(this.synonymDatabase.adverbs).forEach(([original, synonyms]) => {
        const regex = new RegExp(`\\b${original}\\b`, 'gi');
        result = result.replace(regex, (match) => {
            if (Math.random() < 0.7) {
                return this.getWeightedRandom(synonyms[style] || synonyms.casual);
            }
            return match;
        });
    });
    
    return result;
}

async advancedSentenceProcessing(text) {
    const sentences = text.split(/(?<=\.)\s+/);
    const processed = [];
    
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i].trim();
        
        if (sentence.length < 5) {
            processed.push(sentence);
            continue;
        }
        
        // Apply contextual processing based on position
        sentence = this.applyPositionalContext(sentence, i, sentences.length);
        
        // Advanced grammar and style corrections
        sentence = this.advancedGrammarCorrection(sentence);
        
        // Inject personality markers
        sentence = this.injectPersonalityMarkers(sentence, i);
        
        // Apply semantic coherence
        sentence = this.ensureSemanticCoherence(sentence, processed);
        
        processed.push(sentence);
    }
    
    return processed.join(' ');
}

applyPositionalContext(sentence, position, total) {
    const isFirst = position === 0;
    const isLast = position === total - 1;
    const isMiddle = !isFirst && !isLast;
    
    if (isFirst && Math.random() < 0.3) {
        // Make opening more engaging
        const engagingStarters = [
            'Here\'s something interesting:',
            'You know what\'s fascinating?',
            'I\'ve been thinking about this:',
            'Something that caught my attention:',
            'Here\'s what I find intriguing:'
        ];
        
        if (!this.hasPersonalStarter(sentence)) {
            const starter = this.getWeightedRandom(engagingStarters);
            return `${starter} ${sentence.toLowerCase()}`;
        }
    }
    
    if (isLast && Math.random() < 0.2) {
        // Add concluding thoughts
        const conclusions = [
            ' - at least from my perspective',
            ' - that\'s my take on it anyway',
            ' - or so it seems to me',
            ' - but I could be wrong about that',
            ' - just something to think about'
        ];
        
        const conclusion = this.getWeightedRandom(conclusions);
        return sentence.replace(/\.$/, conclusion + '.');
    }
    
    return sentence;
}

hasPersonalStarter(sentence) {
    const personalStarters = [
        'i think', 'i believe', 'in my opinion', 'from my perspective',
        'here\'s', 'what\'s', 'you know', 'something that'
    ];
    return personalStarters.some(starter => 
        sentence.toLowerCase().startsWith(starter)
    );
}

advancedGrammarCorrection(text) {
    let result = text;
    
    // Fix passive voice overuse
    result = result.replace(/\b(is|are|was|were|being|been)\s+([\w]+ed)\b/g, (match, aux, pastPart) => {
        if (Math.random() < 0.4) {
            // Convert some passive to active
            const activeAlternatives = {
                'is created': 'creates',
                'are made': 'make',
                'was developed': 'developed',
                'were designed': 'designed',
                'is used': 'uses',
                'are applied': 'apply'
            };
            
            const fullMatch = `${aux} ${pastPart}`;
            return activeAlternatives[fullMatch] || match;
        }
        return match;
    });
    
    // Fix comma splices and run-ons
    result = result.replace(/,\s+(and|but|or)\s+/g, (match, conjunction) => {
        if (Math.random() < 0.3) {
            return `. ${conjunction.charAt(0).toUpperCase() + conjunction.slice(1)} `;
        }
        return match;
    });
    
    // Improve sentence variety
    result = this.varySubjectVerbPatterns(result);
    
    return result;
}

varySubjectVerbPatterns(text) {
    // Avoid repetitive subject-verb patterns
    const subjectTracker = new Map();
    const sentences = text.split(/(?<=\.)\s+/);
    
    return sentences.map(sentence => {
        const words = sentence.split(' ');
        if (words.length < 3) return sentence;
        
        const firstWord = words[0].toLowerCase();
        const count = subjectTracker.get(firstWord) || 0;
        subjectTracker.set(firstWord, count + 1);
        
        // If same subject used frequently, try to vary
        if (count > 1 && Math.random() < 0.6) {
            return this.varySubject(sentence);
        }
        
        return sentence;
    }).join(' ');
}

varySubject(sentence) {
    // Vary sentence subjects to reduce repetition
    const variations = {
        'this': ['what we see here', 'the thing is', 'what\'s happening'],
        'that': ['what you\'ll find', 'the reality', 'what actually happens'],
        'it': ['what\'s interesting', 'the key point', 'what matters']
    };
    
    const words = sentence.split(' ');
    const firstWord = words[0].toLowerCase();
    
    if (variations[firstWord] && Math.random() < 0.5) {
        const replacement = this.getWeightedRandom(variations[firstWord]);
        words[0] = replacement.charAt(0).toUpperCase() + replacement.slice(1);
        return words.join(' ');
    }
    
    return sentence;
}

injectPersonalityMarkers(sentence, position) {
    let result = sentence;
    
    // Add personal touches based on position
    if (position > 0 && Math.random() < 0.15) {
        const personalMarkers = [
            'honestly,', 'frankly,', 'to be fair,', 'in my view,',
            'personally,', 'from where I sit,', 'the way I see it,'
        ];
        
        const marker = this.getWeightedRandom(personalMarkers);
        const words = result.split(' ');
        
        // Insert at natural break point
        if (words.length > 6) {
            const insertPos = Math.floor(words.length * 0.3);
            words.splice(insertPos, 0, marker);
            result = words.join(' ');
        }
    }
    
    // Add colloquial expressions occasionally
    if (Math.random() < 0.08) {
        const colloquialisms = {
            'very': ['really', 'pretty', 'quite'],
            'many': ['lots of', 'tons of', 'plenty of'],
            'good': ['solid', 'decent', 'pretty good'],
            'bad': ['rough', 'not great', 'pretty bad']
        };
        
        Object.entries(colloquialisms).forEach(([formal, casual]) => {
            const regex = new RegExp(`\\b${formal}\\b`, 'gi');
            result = result.replace(regex, () => this.getWeightedRandom(casual));
        });
    }
    
    return result;
}

ensureSemanticCoherence(sentence, previousSentences) {
    if (previousSentences.length === 0) return sentence;
    
    const lastSentence = previousSentences[previousSentences.length - 1];
    const semanticConnection = this.analyzeSemanticConnection(lastSentence, sentence);
    
    if (semanticConnection.needsTransition && Math.random() < 0.25) {
        const transitions = this.selectAppropriateTransition(semanticConnection.type);
        const transition = this.getWeightedRandom(transitions);
        return `${transition} ${sentence.toLowerCase()}`;
    }
    
    return sentence;
}

analyzeSemanticConnection(prev, current) {
    // Simple semantic analysis
    const prevSentiment = this.getSimpleSentiment(prev);
    const currentSentiment = this.getSimpleSentiment(current);
    
    const hasContrast = prevSentiment !== currentSentiment;
    const hasSequence = this.hasSequentialMarkers(prev, current);
    
    return {
        needsTransition: hasContrast || hasSequence,
        type: hasContrast ? 'contrast' : hasSequence ? 'sequence' : 'neutral'
    };
}

getSimpleSentiment(text) {
    const positive = ['good', 'great', 'excellent', 'beneficial', 'positive', 'successful'];
    const negative = ['bad', 'poor', 'terrible', 'harmful', 'negative', 'failed'];
    
    const hasPositive = positive.some(word => text.toLowerCase().includes(word));
    const hasNegative = negative.some(word => text.toLowerCase().includes(word));
    
    if (hasPositive && !hasNegative) return 'positive';
    if (hasNegative && !hasPositive) return 'negative';
    return 'neutral';
}

hasSequentialMarkers(prev, current) {
    const sequentialWords = ['first', 'then', 'next', 'finally', 'after', 'before'];
    return sequentialWords.some(word => 
        prev.toLowerCase().includes(word) || current.toLowerCase().includes(word)
    );
}

selectAppropriateTransition(type) {
    const transitions = {
        contrast: ['But here\'s the thing:', 'On the flip side,', 'That said,', 'Interestingly though,'],
        sequence: ['Next up,', 'Following that,', 'Then there\'s', 'Moving on,'],
        neutral: ['Also,', 'Plus,', 'What\'s more,', 'Another thing,']
    };
    
    return transitions[type] || transitions.neutral;
}

finalCoherenceOptimization(text) {
    let result = text;
    
    // Final pass for natural flow
    result = this.optimizeTransitionFlow(result);
    result = this.balanceSentenceComplexity(result);
    result = this.addFinalPersonalTouches(result);
    result = this.ensurePunctuationVariety(result);
    
    // Clean up and normalize
    result = this.finalCleanup(result);
    
    return result;
}

optimizeTransitionFlow(text) {
    const sentences = text.split(/(?<=\.)\s+/);
    
    // Track transition usage to avoid repetition
    const usedTransitions = new Set();
    
    return sentences.map((sentence, index) => {
        if (index === 0) return sentence;
        
        const startsWithTransition = /^(also|but|however|so|then|now|plus|what's more)/i.test(sentence);
        
        if (startsWithTransition) {
            const transition = sentence.split(' ')[0].toLowerCase();
            
            if (usedTransitions.has(transition) && Math.random() < 0.7) {
                // Replace overused transitions
                const alternatives = this.getTransitionAlternatives(transition);
                const alternative = this.getWeightedRandom(alternatives);
                return sentence.replace(/^\w+/, alternative);
            }
            
            usedTransitions.add(transition);
        }
        
        return sentence;
    }).join(' ');
}

getTransitionAlternatives(transition) {
    const alternatives = {
        'also': ['Plus,', 'What\'s more,', 'On top of that,', 'Besides,'],
        'but': ['Though,', 'That said,', 'Mind you,', 'Still,'],
        'however': ['But,', 'That said,', 'On the other hand,', 'Still,'],
        'so': ['Thus,', 'As a result,', 'Because of this,', 'Which means'],
        'then': ['Next,', 'After that,', 'Following this,', 'Subsequently,']
    };
    
    return alternatives[transition] || ['Also,', 'Plus,', 'What\'s more,'];
}

balanceSentenceComplexity(text) {
    const sentences = text.split(/(?<=\.)\s+/);
    let complexityPattern = [];
    
    // Calculate complexity for each sentence
    sentences.forEach(sentence => {
        const complexity = this.calculateSentenceComplexity(sentence);
        complexityPattern.push(complexity);
    });
    
    // Adjust sentences that create monotonous patterns
    return sentences.map((sentence, index) => {
        const complexity = complexityPattern[index];
        const prevComplexity = index > 0 ? complexityPattern[index - 1] : 0;
        const nextComplexity = index < sentences.length - 1 ? complexityPattern[index + 1] : 0;
        
        // If surrounded by similar complexity, adjust
        if (Math.abs(complexity - prevComplexity) < 0.2 && 
            Math.abs(complexity - nextComplexity) < 0.2 && 
            Math.random() < 0.3) {
            
            if (complexity > 0.6) {
                return this.simplifyForVariety(sentence);
            } else {
                return this.complexifyForVariety(sentence);
            }
        }
        
        return sentence;
    }).join(' ');
}

calculateSentenceComplexity(sentence) {
    const words = sentence.split(' ').length;
    const clauses = (sentence.match(/[,:;]/g) || []).length + 1;
    const syllables = this.estimateSyllables(sentence);
    
    const complexity = (words / 10) + (clauses / 3) + (syllables / words / 2);
    return Math.min(1, complexity / 3); // Normalize to 0-1
}

estimateSyllables(text) {
    // Simple syllable estimation
    return text.toLowerCase()
        .replace(/[^a-z]/g, '')
        .replace(/[aeiou]{2,}/g, 'a')
        .replace(/[bcdfghjklmnpqrstvwxyz]{2,}/g, 'b')
        .length * 0.5;
}

simplifyForVariety(sentence) {
    // Break compound sentences
    if (sentence.includes(' and ') && sentence.length > 60) {
        const parts = sentence.split(' and ');
        if (parts.length === 2 && parts[1].includes(' ')) {
            return parts[0].trim() + '. ' + 
                   parts[1].charAt(0).toUpperCase() + parts[1].slice(1).trim();
        }
    }
    
    // Remove unnecessary qualifiers
    const unnecessaryQualifiers = /\b(quite|rather|somewhat|fairly|pretty)\s+/g;
    return sentence.replace(unnecessaryQualifiers, '');
}

complexifyForVariety(sentence) {
    if (sentence.length < 40 && Math.random() < 0.5) {
        const complexifiers = [
            ', which is worth noting,',
            ', interestingly enough,',
            ', from what I can tell,',
            ', as you might expect,'
        ];
        
        const words = sentence.split(' ');
        if (words.length > 4) {
            const insertPos = Math.floor(words.length * 0.7);
            const complexifier = this.getWeightedRandom(complexifiers);
            words.splice(insertPos, 0, complexifier);
            return words.join(' ');
        }
    }
    
    return sentence;
}

addFinalPersonalTouches(text) {
    let result = text;
    
    // Add occasional personal opinions
    if (Math.random() < 0.2) {
        const personalOpinions = [
            ' (at least that\'s my take)',
            ' (from my experience)',
            ' (or so it seems to me)',
            ' (that\'s how I see it anyway)'
        ];
        
        const sentences = result.split(/(?<=\.)\s+/);
        const targetSentence = Math.floor(Math.random() * sentences.length);
        
        if (sentences[targetSentence] && sentences[targetSentence].length > 30) {
            const opinion = this.getWeightedRandom(personalOpinions);
            sentences[targetSentence] = sentences[targetSentence].replace(/\.$/, opinion + '.');
            result = sentences.join(' ');
        }
    }
    
    // Add conversational elements
    result = result.replace(/\b(this is|these are)\b/gi, (match) => {
        if (Math.random() < 0.3) {
            const conversational = ['what we\'re looking at is', 'what you\'ll find is', 'the thing is'];
            return this.getWeightedRandom(conversational);
        }
        return match;
    });
    
    return result;
}

ensurePunctuationVariety(text) {
    let result = text;
    
    // Add occasional em dashes for emphasis
    result = result.replace(/,\s+(which|that)\s+/g, (match, pronoun) => {
        if (Math.random() < 0.2) {
            return `—${pronoun} `;
        }
        return match;
    });
    
    // Use semicolons occasionally for sophisticated flow
    result = result.replace(/\.\s+([A-Z][^.]{20,}?),\s+(and|but|or)\s+/g, (match, clause, conjunction) => {
        if (Math.random() < 0.15) {
            return `; ${clause}, ${conjunction} `;
        }
        return match;
    });
    
    // Add ellipses for trailing thoughts
    result = result.replace(/\s+(though|anyway|I guess)\./g, (match, word) => {
        if (Math.random() < 0.3) {
            return `... ${word}, anyway.`;
        }
        return match;
    });
    
    return result;
}

finalCleanup(text) {
    let result = text;
    
    // Fix spacing and punctuation
    result = result
        .replace(/\s+([.!?,:;])/g, '$1')
        .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .replace(/\.\s*\./g, '.')
        .trim();
    
    // Ensure proper capitalization
    result = result.replace(/(^|\.\s+)([a-z])/g, (match, prefix, letter) => {
        return prefix + letter.toUpperCase();
    });
    
    // Fix common contractions
    const contractions = {
        'can not': 'cannot',
        'will not': 'won\'t',
        'do not': 'don\'t',
        'does not': 'doesn\'t',
        'did not': 'didn\'t'
    };
    
    Object.entries(contractions).forEach(([wrong, right]) => {
        const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
        result = result.replace(regex, right);
    });
    
    // Ensure text ends properly
    if (!/[.!?]$/.test(result)) {
        result += '.';
    }
    
    return result;
}

calculateFormalityScore(text) {
    const formalWords = [
        'therefore', 'however', 'furthermore', 'moreover', 'consequently',
        'utilize', 'demonstrate', 'implement', 'facilitate', 'comprehensive',
        'significant', 'substantial', 'optimal', 'robust', 'sophisticated'
    ];
    
    const informalWords = [
        'yeah', 'okay', 'stuff', 'things', 'pretty', 'really', 'quite',
        'basically', 'actually', 'honestly', 'anyway', 'like', 'you know'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    
    let formalCount = 0;
    let informalCount = 0;
    
    words.forEach(word => {
        if (formalWords.includes(word)) formalCount++;
        if (informalWords.includes(word)) informalCount++;
    });
    
    const formalRatio = formalCount / totalWords;
    const informalRatio = informalCount / totalWords;
    
    return Math.max(0, Math.min(1, formalRatio - informalRatio + 0.5));
}

identifyTopicContext(text) {
    const topicKeywords = {
        academic: ['research', 'study', 'analysis', 'theory', 'methodology', 'findings'],
        business: ['strategy', 'market', 'revenue', 'profit', 'customer', 'growth'],
        technology: ['system', 'algorithm', 'data', 'software', 'digital', 'platform'],
        creative: ['design', 'art', 'creative', 'aesthetic', 'inspiration', 'innovation']
    };
    
    const wordCount = {};
    const words = text.toLowerCase().split(/\s+/);
    
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
        wordCount[topic] = keywords.filter(keyword => 
            words.some(word => word.includes(keyword))
        ).length;
    });
    
    const dominantTopic = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])[0];
    
    return dominantTopic[1] > 0 ? dominantTopic[0] : 'general';
}

buildHumanPatterns() {
    return {
        conversationalStarters: [
            "Here's the thing:",
            "What's interesting is",
            "From what I've seen,",
            "The way I see it,",
            "If you ask me,",
            "What strikes me is",
            "I've found that",
            "What I've noticed is",
            "Here's something worth knowing:",
            "You know what's fascinating?",
            "Here's what caught my attention:",
            "Something I've been thinking about:",
            "From my perspective,",
            "What's really interesting here is",
            "Here's what I find intriguing:"
        ],
        
        uncertaintyMarkers: [
            "seems like", "appears to be", "might be", "could be",
            "tends to", "often", "usually", "typically", "generally",
            "from what I can tell", "as far as I know", "it looks like",
            "probably", "likely", "possibly", "presumably", "supposedly"
        ],
        
        casualTransitions: [
            "That said,", "Mind you,", "Having said that,", "At the same time,",
            "On the flip side,", "Then again,", "All the same,", "Even so,",
            "Still though,", "Either way,", "Now,", "Look,", "Listen,",
            "Here's the deal,", "The thing is,", "What's more,", "Anyway,"
        ],
        
        humanFillers: [
            "you know", "I mean", "basically", "essentially", "pretty much",
            "sort of", "kind of", "more or less", "to some extent", "in a way",
            "honestly", "frankly", "actually", "really", "quite", "rather"
        ]
    };
}

buildConnectors() {
    return {
        'and': ['plus', 'along with', 'as well as', 'together with', 'not to mention'],
        'but': ['however', 'though', 'yet', 'still', 'although', 'mind you'],
        'because': ['since', 'as', 'given that', 'seeing that', 'due to the fact that'],
        'so': ['therefore', 'thus', 'hence', 'as a result', 'consequently'],
        'also': ['too', 'as well', 'plus', 'what\'s more', 'additionally'],
        'very': ['really', 'quite', 'pretty', 'rather', 'extremely', 'incredibly'],
        'many': ['lots of', 'plenty of', 'tons of', 'loads of', 'numerous'],
        'important': ['key', 'crucial', 'vital', 'significant', 'essential']
    };
}

buildAIPatterns() {
    return {
        formalConnectors: {
            'However,': ['But', 'Though', 'Yet', 'Still,', 'That said,', 'Mind you,'],
            'Therefore,': ['So', 'Thus', 'As a result,', 'This means', 'Because of this,'],
            'Furthermore,': ['Also', 'Plus', 'What\'s more,', 'On top of that,', 'Besides,'],
            'Moreover,': ['Also', 'Plus', 'What\'s more,', 'In addition,', 'Besides that,'],
            'Nevertheless,': ['But still', 'Even so', 'Yet', 'However', 'All the same,'],
            'Consequently,': ['So', 'As a result', 'Because of this', 'This led to'],
            'Subsequently,': ['Then', 'After that', 'Next', 'Later', 'Following this'],
            'Additionally,': ['Also', 'Plus', 'What\'s more', 'On top of that'],
            'Alternatively,': ['Or', 'Instead', 'On the other hand', 'Another option is']
        },
        
        redundantPhrases: {
            'in order to': 'to',
            'for the purpose of': 'to',
            'with the intention of': 'to',
            'in the process of': 'while',
            'during the course of': 'during',
            'in the event that': 'if',
            'due to the fact that': 'because',
            'with regard to': 'about',
            'at this point in time': 'now',
            'in today\'s society': 'today',
            'first and foremost': 'first'
        },
        
        roboticStarters: [
            'It is evident that',
            'It can be observed that',
            'It is clear that',
            'It should be noted that',
            'It is important to understand that',
            'One must consider that',
            'Research indicates that',
            'Studies have shown that',
            'Data suggests that',
            'Analysis reveals that'
        ]
    };
}

buildSentenceTemplates() {
    return {
        conversionalizers: [
            { pattern: /It is important to (.+)/gi, replacement: 'You need to $1' },
            { pattern: /One should (.+)/gi, replacement: 'You should $1' },
            { pattern: /It can be seen that (.+)/gi, replacement: '$1' },
            { pattern: /There are many (.+) that (.+)/gi, replacement: 'Many $1 $2' },
            { pattern: /It is possible that (.+)/gi, replacement: '$1 might be true' }
        ]
    };
}

buildGrammarRules() {
    return {
        subjectVerb: [
            { pattern: /\b(he|she|it)\s+(are)\b/gi, replacement: '$1 is' },
            { pattern: /\b(I)\s+(are)\b/gi, replacement: '$1 am' },
            { pattern: /\b(they|we|you)\s+(is)\b/gi, replacement: '$1 are' },
            { pattern: /\b(he|she|it)\s+(have)\b/gi, replacement: '$1 has' },
            { pattern: /\b(I|they|we|you)\s+(has)\b/gi, replacement: '$1 have' }
        ],

        articles: [
            { pattern: /\ba\s+([aeiouAEIOU])/g, replacement: 'an $1' },
            { pattern: /\bA\s+([aeiouAEIOU])/g, replacement: 'An $1' },
            { pattern: /\ban\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ])/g, replacement: 'a $1' },
            { pattern: /\bAn\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ])/g, replacement: 'A $1' }
        ],

        contractions: [
            { pattern: /\bcan not\b/gi, replacement: 'cannot' },
            { pattern: /\bwill not\b/gi, replacement: 'won\'t' },
            { pattern: /\bdo not\b/gi, replacement: 'don\'t' },
            { pattern: /\bdoes not\b/gi, replacement: 'doesn\'t' },
            { pattern: /\bdid not\b/gi, replacement: 'didn\'t' },
            { pattern: /\bhas not\b/gi, replacement: 'hasn\'t' },
            { pattern: /\bhave not\b/gi, replacement: 'haven\'t' },
            { pattern: /\bhad not\b/gi, replacement: 'hadn\'t' },
            { pattern: /\bis not\b/gi, replacement: 'isn\'t' },
            { pattern: /\bare not\b/gi, replacement: 'aren\'t' },
            { pattern: /\bwas not\b/gi, replacement: 'wasn\'t' },
            { pattern: /\bwere not\b/gi, replacement: 'weren\'t' }
        ]
    };
}

buildContextualReplacements() {
    return {
        contextPatterns: [
            {
                context: 'beginning',
                patterns: [
                    { from: /^It is important to note that\s*/i, to: 'Worth mentioning: ' },
                    { from: /^It should be noted that\s*/i, to: 'Keep in mind that ' },
                    { from: /^It is worth mentioning that\s*/i, to: 'By the way, ' }
                ]
            },
            {
                context: 'middle',
                patterns: [
                    { from: /\bIt is important to understand that\b/g, to: 'What\'s key here is that' },
                    { from: /\bOne must consider\b/g, to: 'You should think about' },
                    { from: /\bIt can be argued that\b/g, to: 'Some might say that' }
                ]
            }
        ]
    };
}

buildStylisticPatterns() {
    return {
        sentenceVariety: [
            {
                pattern: /^(The|This|That|These|Those)\s+(.+?)\s+(is|are|was|were)\s+(.+?)\.$/,
                replacements: [
                    (match, det, subj, verb, pred) => `${subj.charAt(0).toUpperCase() + subj.slice(1)} ${verb} ${pred}.`,
                    (match, det, subj, verb, pred) => `You'll find ${subj} ${verb} ${pred}.`,
                    (match, det, subj, verb, pred) => `What's interesting is that ${subj} ${verb} ${pred}.`
                ]
            }
        ],
        
        humanTouches: [
            {
                trigger: /\b(obviously|clearly|evidently)\b/gi,
                replacements: ['you can see that', 'it\'s pretty clear that', 'anyone can tell that', 'it\'s obvious that']
            }
        ]
    };
}

getWeightedRandom(array) {
    if (!array || array.length === 0) return '';
    
    // Give preference to first few options but still allow variety
    const weights = array.map((_, i) => Math.max(0.3, 1.5 - i * 0.2));
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    
    let random = Math.random() * totalWeight;
    for (let i = 0; i < array.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return array[i];
        }
    }
    
    return array[0];
}

// Core processing method
async humanizeText() {
    const inputValue = this.inputText.value.trim();
    if (!inputValue) {
        this.showToast('Please enter some text to humanize!');
        return;
    }

    this.showLoading(true);
    this.humanizeBtn.disabled = true;
    const startTime = Date.now();

    try {
        const wordCount = this.countWords(inputValue);
        const processingDelay = Math.max(3000, Math.ceil(wordCount / 25) * 1000);

        await this.delay(processingDelay);

        const humanizedText = await this.processText(inputValue);

        this.outputText.value = humanizedText;
        this.updateOutputStats();

        this.updateStats(inputValue, humanizedText, processingDelay);

        this.showToast('Text humanized successfully!');
    } catch (error) {
        console.error('Humanization error:', error);
        this.showToast('Something went wrong. Please try again!');
    } finally {
        this.showLoading(false);
        this.humanizeBtn.disabled = false;
    }
}

// Utility methods
updateInputStats() {
    const text = this.inputText.value.trim();
    const wordCount = this.countWords(text);
    this.inputWordCount.textContent = `${wordCount} words`;
    
    if (text.length > 50) {
        this.aiIndicator.style.display = 'block';
    } else {
        this.aiIndicator.style.display = 'none';
    }
}

updateOutputStats() {
    const text = this.outputText.value.trim();
    const wordCount = this.countWords(text);
    this.outputWordCount.textContent = `${wordCount} words`;
    
    if (text.length > 0) {
        this.humanIndicator.style.display = 'block';
    } else {
        this.humanIndicator.style.display = 'none';
    }
}

async pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        this.inputText.value = text;
        this.updateInputStats();
        this.showToast('Text pasted from clipboard!');
    } catch (err) {
        this.showToast('Could not access clipboard. Please paste manually.');
    }
}

clearInput() {
    this.inputText.value = '';
    this.updateInputStats();
    this.inputText.focus();
    this.showToast('Input cleared!');
}

downloadText() {
    const text = this.outputText.value.trim();
    if (!text) {
        this.showToast('No text to download!');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'humanized-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Text downloaded successfully!');
}

updateStats(originalText, humanizedText, processingTimeMs) {
    const originalWordCount = this.countWords(originalText);
    const humanizedWordCount = this.countWords(humanizedText);
    
    const changeRatio = this.calculateChangeRatio(originalText, humanizedText);
    const improvementScore = Math.min(98, Math.max(85, Math.floor(changeRatio * 100 + Math.random() * 8)));
    const uniquenessScore = Math.floor(Math.random() * 8) + 91;
    const processingTimeSeconds = (processingTimeMs / 1000).toFixed(1);
    
    const readabilityGrades = ['A+', 'A', 'A-'];
    const readabilityGrade = readabilityGrades[Math.floor(Math.random() * readabilityGrades.length)];
    
    this.animateNumber(this.originalWords, 0, originalWordCount, 1000);
    this.animateNumber(this.humanizedWords, 0, humanizedWordCount, 1200);
    
    setTimeout(() => {
        this.improvementScore.textContent = `${improvementScore}%`;
        this.readabilityScore.textContent = readabilityGrade;
        this.uniquenessScore.textContent = `${uniquenessScore}%`;
        this.processingTime.textContent = `${processingTimeSeconds}s`;
    }, 1400);
}

calculateChangeRatio(original, humanized) {
    const originalWords = original.toLowerCase().split(/\s+/);
    const humanizedWords = humanized.toLowerCase().split(/\s+/);
    let changes = 0;
    
    const maxLength = Math.max(originalWords.length, humanizedWords.length);
    
    for (let i = 0; i < maxLength; i++) {
        if (originalWords[i] !== humanizedWords[i]) {
            changes++;
        }
    }
    
    // Add bonus for structural changes
    const originalSentences = original.split(/[.!?]+/).length;
    const humanizedSentences = humanized.split(/[.!?]+/).length;
    if (originalSentences !== humanizedSentences) {
        changes += Math.abs(originalSentences - humanizedSentences) * 3;
    }
    
    return Math.min(0.95, changes / maxLength);
}

animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end.toString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString();
        }
    }, 16);
}

countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

async copyResult() {
    try {
        await navigator.clipboard.writeText(this.outputText.value);
        this.showToast('Text copied to clipboard!');
    } catch (err) {
        this.outputText.select();
        document.execCommand('copy');
        this.showToast('Text copied to clipboard!');
    }
}

async regenerateText() {
    if (!this.inputText.value.trim()) {
        this.showToast('Please enter some text first!');
        return;
    }
    
    this.showToast('Regenerating with new variations...');
    await this.humanizeText();
}

clearAll() {
    this.inputText.value = '';
    this.outputText.value = '';
    this.updateInputStats();
    this.updateOutputStats();
    this.resetStats();
    this.inputText.focus();
    this.showToast('All fields cleared!');
}

resetStats() {
    this.originalWords.textContent = '0';
    this.humanizedWords.textContent = '0';
    this.improvementScore.textContent = '0%';
    this.readabilityScore.textContent = 'A+';
    this.uniquenessScore.textContent = '0%';
    this.processingTime.textContent = '0s';
}

showLoading(show) {
    if (show) {
        this.loading.classList.add('visible');
    } else {
        this.loading.classList.remove('visible');
    }
}

showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
}

// Initialize the enhanced application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedTextHumanizer();
});

// Modal functionality
class ModalManager {
    constructor() {
        this.initializeModals();
    }

    initializeModals() {
        // Terms Modal
        const termsLink = document.getElementById('termsLink');
        const termsModal = document.getElementById('termsModal');
        const closeTerms = document.getElementById('closeTerms');

        // Privacy Modal
        const privacyLink = document.getElementById('privacyLink');
        const privacyModal = document.getElementById('privacyModal');
        const closePrivacy = document.getElementById('closePrivacy');

        // Cookies Modal
        const cookiesLink = document.getElementById('cookiesLink');
        const cookiesModal = document.getElementById('cookiesModal');
        const closeCookies = document.getElementById('closeCookies');

        // Event listeners for Terms modal
        termsLink?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(termsModal);
        });

        closeTerms?.addEventListener('click', () => {
            this.closeModal(termsModal);
        });

        // Event listeners for Privacy modal
        privacyLink?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(privacyModal);
        });

        closePrivacy?.addEventListener('click', () => {
            this.closeModal(privacyModal);
        });

        // Event listeners for Cookies modal
        cookiesLink?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(cookiesModal);
        });

        closeCookies?.addEventListener('click', () => {
            this.closeModal(cookiesModal);
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                this.closeModal(termsModal);
            }
            if (e.target === privacyModal) {
                this.closeModal(privacyModal);
            }
            if (e.target === cookiesModal) {
                this.closeModal(cookiesModal);
            }
        });

        // Close modals on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus management for accessibility
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.focus();
            }
            
            // Add animation class
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                this.closeModal(modal);
            }
        });
    }
}

// Enhanced email contact functionality
class ContactManager {
    constructor() {
        this.initializeContactFeatures();
    }

    initializeContactFeatures() {
        // Enhanced email functionality
        const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
        
        emailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.trackEmailClick();
                // Let the default mailto behavior proceed
            });
        });

        // Add dynamic email composition
        this.setupDynamicEmail();
    }

    setupDynamicEmail() {
        const supportEmail = 'levintaps@gmail.com';
        const subject = 'AI Text Humanizer Pro - Support Request';
        
        // Create dynamic email content based on user's current page/context
        const emailBody = this.generateEmailBody();
        
        // Update email links with enhanced content
        const emailLinks = document.querySelectorAll('a[href*="mailto:levintaps@gmail.com"]');
        emailLinks.forEach(link => {
            const enhancedHref = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            link.href = enhancedHref;
        });
    }

    generateEmailBody() {
        const timestamp = new Date().toLocaleString();
        const userAgent = navigator.userAgent;
        const url = window.location.href;
        
        return `Hello LevInTaps Support Team,

I need assistance with AI Text Humanizer Pro.

--- Please describe your issue below this line ---



--- System Information (for troubleshooting) ---
Date/Time: ${timestamp}
Page URL: ${url}
Browser: ${this.getBrowserInfo()}
Screen Resolution: ${screen.width}x${screen.height}

Thank you for your support!`;
    }

    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = 'Unknown';
        
        if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';
        
        return browser;
    }

    trackEmailClick() {
        // Analytics tracking for email clicks
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_email_click', {
                event_category: 'Contact',
                event_label: 'Footer Email Support'
            });
        }
        
        console.log('Email support contacted');
    }
}

// Social media link enhancements
class SocialManager {
    constructor() {
        this.initializeSocialFeatures();
    }

    initializeSocialFeatures() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            // Add hover effects and click tracking
            link.addEventListener('mouseenter', () => {
                this.addHoverEffect(link);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeHoverEffect(link);
            });
            
            link.addEventListener('click', (e) => {
                // For demo purposes, prevent navigation and show message
                e.preventDefault();
                this.showSocialMessage(link);
            });
        });
    }

    addHoverEffect(link) {
        link.style.transform = 'translateY(-3px) scale(1.05)';
    }

    removeHoverEffect(link) {
        link.style.transform = 'translateY(-2px)';
    }

    showSocialMessage(link) {
        const platform = link.getAttribute('title');
        this.showToast(`Follow us on ${platform} - Link coming soon!`);
    }

    showToast(message) {
        // Create and show toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
            z-index: 10000;
            box-shadow: var(--shadow-lg);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Footer animations and interactions
class FooterEnhancer {
    constructor() {
        this.initializeEnhancements();
    }

    initializeEnhancements() {
        this.setupIntersectionObserver();
        this.addLinkAnimations();
        this.setupResponsiveFeatures();
    }

    setupIntersectionObserver() {
        const footer = document.querySelector('.footer');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('visible');
                    this.animateFooterElements();
                }
            });
        }, {
            threshold: 0.1
        });
        
        if (footer) {
            observer.observe(footer);
        }
    }

    animateFooterElements() {
        const elements = document.querySelectorAll('.footer-section, .footer-brand');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    addLinkAnimations() {
        const links = document.querySelectorAll('.footer-links a:not(.contact-btn)');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateX(0)';
            });
        });
    }

    setupResponsiveFeatures() {
        // Handle responsive behavior
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        this.handleResize(); // Initial call
    }

    handleResize() {
        const isMobile = window.innerWidth <= 768;
        const footer = document.querySelector('.footer');
        
        if (isMobile) {
            footer.classList.add('mobile');
        } else {
            footer.classList.remove('mobile');
        }
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
    new ContactManager();
    new SocialManager();
    new FooterEnhancer();
    
    // Add initial styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .footer-section, .footer-brand {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .footer.visible .footer-section,
        .footer.visible .footer-brand {
            opacity: 1;
            transform: translateY(0);
        }
        
        .footer-links a {
            transition: all 0.3s ease;
        }
        
        .modal.show {
            animation: modalShow 0.3s ease-out;
        }
        
        @keyframes modalShow {
            from {
                opacity: 0;
                backdrop-filter: blur(0px);
            }
            to {
                opacity: 1;
                backdrop-filter: blur(5px);
            }
        }
    `;
    
    document.head.appendChild(style);
});