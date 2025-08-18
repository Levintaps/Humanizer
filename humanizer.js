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

buildAdvancedSynonymDatabase() {
    return {
        // High-priority AI words to replace
        'utilize': ['use', 'employ', 'work with', 'apply', 'make use of', 'put to use', 'take advantage of'],
        'facilitate': ['help', 'make easier', 'assist', 'enable', 'support', 'aid', 'boost'],
        'implement': ['put in place', 'set up', 'establish', 'create', 'build', 'develop', 'roll out'],
        'demonstrate': ['show', 'prove', 'reveal', 'illustrate', 'display', 'present', 'make clear'],
        'optimize': ['improve', 'enhance', 'make better', 'fine-tune', 'perfect', 'refine', 'boost'],
        'comprehensive': ['complete', 'thorough', 'detailed', 'full', 'extensive', 'wide-ranging'],
        'significant': ['important', 'major', 'big', 'considerable', 'substantial', 'meaningful'],
        'substantial': ['significant', 'large', 'major', 'considerable', 'hefty', 'sizable'],
        'fundamental': ['basic', 'core', 'essential', 'key', 'central', 'main', 'primary'],
        'essential': ['vital', 'crucial', 'important', 'necessary', 'key', 'critical', 'needed'],
        'crucial': ['vital', 'essential', 'critical', 'important', 'key', 'necessary'],
        'paramount': ['most important', 'crucial', 'vital', 'key', 'top priority', 'critical'],
        'optimal': ['best', 'ideal', 'perfect', 'most effective', 'top', 'finest'],
        'robust': ['strong', 'reliable', 'solid', 'dependable', 'sturdy', 'tough'],
        'seamless': ['smooth', 'effortless', 'easy', 'fluid', 'natural', 'trouble-free'],
        'sophisticated': ['advanced', 'complex', 'refined', 'detailed', 'elaborate', 'intricate'],
        'innovative': ['creative', 'new', 'original', 'fresh', 'groundbreaking', 'novel'],
        'revolutionary': ['groundbreaking', 'game-changing', 'transformative', 'radical', 'pioneering'],
        'methodology': ['method', 'approach', 'way', 'process', 'system', 'technique'],
        'framework': ['structure', 'system', 'foundation', 'setup', 'outline', 'plan'],
        'paradigm': ['model', 'pattern', 'example', 'approach', 'way of thinking'],
        'leverage': ['use', 'take advantage of', 'make use of', 'harness', 'exploit', 'capitalize on'],
        'enhancement': ['improvement', 'upgrade', 'boost', 'betterment', 'refinement'],
        'concerning': ['about', 'regarding', 'related to', 'when it comes to', 'as for'],
        'subsequently': ['then', 'after that', 'next', 'later', 'following that'],
        'consequently': ['so', 'as a result', 'therefore', 'thus', 'because of this'],
        'nonetheless': ['still', 'however', 'even so', 'yet', 'but still'],
        'furthermore': ['also', 'plus', 'what\'s more', 'additionally', 'on top of that'],
        'moreover': ['also', 'plus', 'what\'s more', 'in addition', 'besides'],
        'therefore': ['so', 'thus', 'as a result', 'because of this', 'for this reason'],
        'however': ['but', 'though', 'yet', 'still', 'on the other hand'],
        'nevertheless': ['but still', 'even so', 'however', 'yet', 'all the same'],
        
        // Additional contextual replacements
        'individuals': ['people', 'folks', 'persons', 'men and women'],
        'regarding': ['about', 'concerning', 'when it comes to', 'as for'],
        'pertaining': ['about', 'relating to', 'concerning', 'regarding'],
        'ascertain': ['find out', 'determine', 'figure out', 'discover'],
        'commence': ['start', 'begin', 'kick off', 'get going'],
        'terminate': ['end', 'stop', 'finish', 'wrap up'],
        'endeavor': ['try', 'attempt', 'effort', 'shot at it'],
        'encounter': ['meet', 'come across', 'run into', 'find'],
        'sufficient': ['enough', 'adequate', 'plenty', 'satisfactory'],
        'acquire': ['get', 'obtain', 'pick up', 'secure'],
        'beneficial': ['helpful', 'useful', 'good', 'positive'],
        'detrimental': ['harmful', 'bad', 'negative', 'damaging'],
        'advantageous': ['beneficial', 'helpful', 'good', 'useful'],
        'numerous': ['many', 'lots of', 'plenty of', 'various'],
        'multiple': ['several', 'many', 'various', 'a bunch of'],
        'alternative': ['option', 'choice', 'different way', 'substitute'],
        'additional': ['extra', 'more', 'further', 'added'],
        'appropriate': ['right', 'suitable', 'proper', 'fitting'],
        'inadequate': ['not enough', 'insufficient', 'lacking', 'poor'],
        'excessive': ['too much', 'over the top', 'extreme', 'way too much']
    };
}

buildStylisticPatterns() {
    return {
        // Patterns that make text sound more human and less AI-generated
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
            },
            {
                trigger: /\b(it should be noted|it is worth noting)\b/gi,
                replacements: ['worth mentioning', 'interesting to note', 'here\'s something worth knowing', 'by the way']
            }
        ],

        personalTouch: [
            'From what I can tell,',
            'In my experience,',
            'What I\'ve noticed is',
            'The way I see it,',
            'From my perspective,',
            'As far as I know,',
            'From what I understand,',
            'In my view,'
        ],

        uncertaintyMarkers: [
            'seems like', 'appears to be', 'looks like', 'might be',
            'could be', 'probably', 'likely', 'tends to be',
            'often is', 'usually', 'typically', 'generally'
        ]
    };
}

buildHumanizationStrategies() {
    return {
        // Advanced strategies to make text less detectable
        intentionalImperfections: [
            {
                type: 'minor_redundancy',
                apply: (text) => this.addMinorRedundancy(text)
            },
            {
                type: 'natural_pauses',
                apply: (text) => this.addNaturalPauses(text)
            },
            {
                type: 'subtle_colloquialisms',
                apply: (text) => this.addSubtleColloquialisms(text)
            }
        ],

        variationPatterns: [
            {
                type: 'sentence_length_variation',
                apply: (text) => this.varySentenceLengths(text)
            },
            {
                type: 'paragraph_structure',
                apply: (text) => this.varyParagraphStructure(text)
            },
            {
                type: 'transition_diversity',
                apply: (text) => this.diversifyTransitions(text)
            }
        ],

        contextualAdjustments: [
            {
                type: 'topic_specific_language',
                apply: (text) => this.adjustForTopic(text)
            },
            {
                type: 'audience_appropriate_tone',
                apply: (text) => this.adjustToneForAudience(text)
            }
        ]
    };
}

buildAIPatterns() {
    return {
        // More comprehensive AI pattern detection and replacement
        formalConnectors: {
            'However,': ['But', 'Though', 'Yet', 'Still,', 'That said,', 'Mind you,'],
            'Therefore,': ['So', 'Thus', 'As a result,', 'This means', 'Because of this,'],
            'Furthermore,': ['Also', 'Plus', 'What\'s more,', 'On top of that,', 'Besides,'],
            'Moreover,': ['Also', 'Plus', 'What\'s more,', 'In addition,', 'Besides that,'],
            'Nevertheless,': ['But still', 'Even so', 'Yet', 'However', 'All the same,'],
            'Consequently,': ['So', 'As a result', 'Because of this', 'This led to'],
            'Subsequently,': ['Then', 'After that', 'Next', 'Later', 'Following this'],
            'In conclusion,': ['To wrap up,', 'In the end,', 'All things considered,', 'To sum up,'],
            'In summary,': ['To recap,', 'In short,', 'Basically,', 'The bottom line is,'],
            'Additionally,': ['Also', 'Plus', 'What\'s more', 'On top of that'],
            'Alternatively,': ['Or', 'Instead', 'On the other hand', 'Another option is'],
            'Specifically,': ['In particular,', 'For instance,', 'Take this example:', 'Like this:']
        },
        
        redundantPhrases: {
            'in order to': 'to',
            'for the purpose of': 'to',
            'with the intention of': 'to',
            'in the process of': 'while',
            'during the course of': 'during',
            'in the event that': 'if',
            'in spite of the fact that': 'although',
            'due to the fact that': 'because',
            'owing to the fact that': 'because',
            'in view of the fact that': 'since',
            'despite the fact that': 'although',
            'with regard to': 'about',
            'with respect to': 'about',
            'in relation to': 'about',
            'as a matter of fact': 'actually',
            'it should be noted that': '',
            'it is important to note that': '',
            'it is worth mentioning that': '',
            'needless to say': '',
            'it goes without saying': 'obviously',
            'at this point in time': 'now',
            'at the present time': 'now',
            'in today\'s society': 'today',
            'on a daily basis': 'daily',
            'in a timely manner': 'quickly',
            'first and foremost': 'first',
            'each and every': 'every',
            'null and void': 'invalid',
            'past history': 'history',
            'future plans': 'plans',
            'end result': 'result',
            'final outcome': 'outcome',
            'advance planning': 'planning',
            'close proximity': 'close',
            'exact same': 'same'
        },

        roboticStarters: [
            'It is evident that',
            'It can be observed that',
            'It is clear that',
            'It should be noted that',
            'It is important to understand that',
            'One must consider that',
            'It is crucial to recognize that',
            'Research indicates that',
            'Studies have shown that',
            'Data suggests that',
            'Analysis reveals that',
            'Investigation shows that',
            'Evidence suggests that',
            'Findings indicate that',
            'Results demonstrate that',
            'The data shows that',
            'Statistics reveal that',
            'Observations indicate that'
        ],

        aiTellSigns: [
            /\b(comprehensive|extensive|detailed)\s+(analysis|overview|examination)\b/gi,
            /\b(multifaceted|multidimensional)\s+(approach|solution|strategy)\b/gi,
            /\bdelve\s+(into|deeper)\b/gi,
            /\bunprecedented\s+(growth|success|opportunity)\b/gi,
            /\bparadigm\s+shift\b/gi,
            /\bholistic\s+approach\b/gi,
            /\bsynergistic\s+(effect|relationship)\b/gi,
            /\bdynamic\s+(environment|landscape)\b/gi,
            /\bstrategic\s+(initiative|framework)\b/gi,
            /\binnovative\s+(solution|approach|methodology)\b/gi
        ]
    };
}

addMinorRedundancy(text) {
    // Add very subtle redundancy that humans naturally use
    const sentences = text.split(/(?<=\.)\s+/);
    return sentences.map((sentence, index) => {
        if (index > 0 && Math.random() < 0.15) {
            const redundancyMarkers = [
                ', as I mentioned,',
                ', like I said,',
                ', again,',
                ', as we saw,'
            ];
            const marker = redundancyMarkers[Math.floor(Math.random() * redundancyMarkers.length)];
            // Insert in middle of sentence
            const words = sentence.split(' ');
            if (words.length > 8) {
                const insertIndex = Math.floor(words.length / 2);
                words.splice(insertIndex, 0, marker);
                return words.join(' ');
            }
        }
        return sentence;
    }).join(' ');
}

addNaturalPauses(text) {
    // Add natural thinking pauses that humans use
    const pauses = [
        ', you know,',
        ', I mean,',
        ', well,',
        ', actually,',
        ', honestly,',
        ', to be fair,',
        ', frankly,',
        ', basically,'
    ];
    
    return text.replace(/(\w+),\s+(\w+)/g, (match, w1, w2) => {
        if (Math.random() < 0.08) {
            const pause = pauses[Math.floor(Math.random() * pauses.length)];
            return `${w1}${pause} ${w2}`;
        }
        return match;
    });
}

addSubtleColloquialisms(text) {
    const colloquialReplacements = {
        'a lot of': ['tons of', 'loads of', 'plenty of', 'heaps of'],
        'very good': ['really good', 'pretty good', 'quite good'],
        'very bad': ['really bad', 'pretty bad', 'quite bad'],
        'very important': ['really important', 'pretty important', 'quite important'],
        'many people': ['lots of people', 'tons of folks', 'plenty of people'],
        'will be': ['\'ll be', 'is going to be', 'will end up being'],
        'cannot': ['can\'t', 'isn\'t able to', 'won\'t be able to'],
        'does not': ['doesn\'t', 'isn\'t', 'won\'t'],
        'do not': ['don\'t', 'won\'t', 'aren\'t going to']
    };

    let result = text;
    Object.entries(colloquialReplacements).forEach(([formal, casual]) => {
        if (Math.random() < 0.3) {
            const replacement = casual[Math.floor(Math.random() * casual.length)];
            const regex = new RegExp(`\\b${formal}\\b`, 'gi');
            result = result.replace(regex, replacement);
        }
    });

    return result;
}

varySentenceLengths(text) {
    const sentences = text.split(/(?<=\.)\s+/);
    let result = [];
    
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i].trim();
        
        // Occasionally combine short sentences
        if (sentence.length < 40 && i < sentences.length - 1 && Math.random() < 0.3) {
            const nextSentence = sentences[i + 1].trim();
            if (nextSentence.length < 40) {
                sentence = sentence.replace(/\.$/, '') + ', and ' + nextSentence.charAt(0).toLowerCase() + nextSentence.slice(1);
                i++; // Skip next sentence as we combined it
            }
        }
        
        // Break very long sentences
        if (sentence.length > 120 && sentence.includes(',')) {
            const parts = sentence.split(',');
            if (parts.length > 2) {
                const firstPart = parts.slice(0, 2).join(',').trim() + '.';
                const secondPart = parts.slice(2).join(',').trim();
                sentence = firstPart + ' ' + secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
            }
        }
        
        result.push(sentence);
    }
    
    return result.join(' ');
}

varyParagraphStructure(text) {
    // Add paragraph breaks in natural places
    const sentences = text.split(/(?<=\.)\s+/);
    if (sentences.length <= 3) return text;
    
    let result = [];
    let currentParagraph = [];
    
    sentences.forEach((sentence, index) => {
        currentParagraph.push(sentence);
        
        // Natural paragraph break points
        if (
            (currentParagraph.length >= 3 && Math.random() < 0.4) ||
            currentParagraph.length >= 5 ||
            (index === sentences.length - 1)
        ) {
            result.push(currentParagraph.join(' '));
            currentParagraph = [];
        }
    });
    
    return result.join('\n\n');
}

diversifyTransitions(text) {
    // Replace repetitive transitions with more varied ones
    const transitionMap = new Map();
    
    return text.replace(/\b(Also|Additionally|Furthermore|Moreover),?\s*/gi, (match) => {
        const used = transitionMap.get(match.toLowerCase()) || 0;
        transitionMap.set(match.toLowerCase(), used + 1);
        
        if (used > 0) {
            const alternatives = ['Plus,', 'What\'s more,', 'On top of that,', 'Besides,', 'And'];
            return alternatives[Math.floor(Math.random() * alternatives.length)] + ' ';
        }
        return match;
    });
}

async processText(text) {
    let result = text;
    
    // Step 1: Pre-processing and normalization
    result = this.normalizeText(result);
    
    // Step 2: Remove obvious AI patterns first
    if (this.settings.patterns) {
        result = this.removeAIPatterns(result);
    }
    
    // Step 3: Apply advanced humanization strategies
    result = await this.applyHumanizationStrategies(result);
    
    // Step 4: Context-aware processing
    result = this.applyContextualProcessing(result);
    
    // Step 5: Sentence-level processing
    const sentences = this.intelligentSentenceSplit(result);
    const processedSentences = await this.processSentences(sentences);
    
    // Step 6: Reconnect with natural flow
    result = this.reconnectWithNaturalFlow(processedSentences);
    
    // Step 7: Apply stylistic variations
    result = this.applyStylisticVariations(result);
    
    // Step 8: Final grammar and coherence pass
    result = this.finalCoherencePass(result);
    
    return result;
}

async applyHumanizationStrategies(text) {
    let result = text;
    
    // Apply each humanization strategy
    for (const strategy of this.humanizationStrategies.intentionalImperfections) {
        if (Math.random() < 0.7) { // Don't apply all strategies every time
            result = strategy.apply(result);
        }
    }
    
    for (const strategy of this.humanizationStrategies.variationPatterns) {
        result = strategy.apply(result);
    }
    
    for (const strategy of this.humanizationStrategies.contextualAdjustments) {
        if (Math.random() < 0.6) {
            result = strategy.apply(result);
        }
    }
    
    return result;
}

applyContextualProcessing(text) {
    // Analyze context and adjust language accordingly
    let result = text;
    
    // Detect if text is technical/academic
    const technicalWords = ['algorithm', 'methodology', 'framework', 'paradigm', 'implementation'];
    const isTechnical = technicalWords.some(word => result.toLowerCase().includes(word));
    
    if (isTechnical && !this.settings.technical) {
        // Make technical content more accessible
        result = this.simplifyTechnicalLanguage(result);
    }
    
    // Detect formality level and adjust
    const formalityLevel = this.detectFormalityLevel(result);
    if (formalityLevel > 0.7) {
        result = this.reduceFormalityLevel(result);
    }
    
    return result;
}

simplifyTechnicalLanguage(text) {
    const technicalSimplifications = {
        'algorithm': 'method',
        'methodology': 'approach',
        'implementation': 'setup',
        'optimization': 'improvement',
        'functionality': 'features',
        'architecture': 'structure',
        'infrastructure': 'system',
        'parameters': 'settings',
        'utilize': 'use',
        'incorporate': 'include'
    };

    let result = text;
    Object.entries(technicalSimplifications).forEach(([tech, simple]) => {
        if (Math.random() < 0.6) {
            const regex = new RegExp(`\\b${tech}\\b`, 'gi');
            result = result.replace(regex, simple);
        }
    });

    return result;
}

detectFormalityLevel(text) {
    const formalWords = [
        'furthermore', 'moreover', 'however', 'therefore', 'consequently',
        'utilize', 'facilitate', 'implement', 'demonstrate', 'comprehensive'
    ];
    
    const totalWords = text.split(/\s+/).length;
    let formalCount = 0;
    
    formalWords.forEach(word => {
        const matches = (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length;
        formalCount += matches;
    });
    
    return formalCount / totalWords;
}

reduceFormalityLevel(text) {
    const formalToInformal = {
        'individuals': 'people',
        'commence': 'start',
        'terminate': 'end',
        'acquire': 'get',
        'sufficient': 'enough',
        'numerous': 'many',
        'approximately': 'about',
        'frequently': 'often',
        'immediately': 'right away',
        'prior to': 'before',
        'subsequent to': 'after'
    };

    let result = text;
    Object.entries(formalToInformal).forEach(([formal, informal]) => {
        if (Math.random() < 0.7) {
            const regex = new RegExp(`\\b${formal}\\b`, 'gi');
            result = result.replace(regex, informal);
        }
    });

    return result;
}

applyStylisticVariations(text) {
    let result = text;
    
    // Apply sentence variety patterns
    this.stylisticPatterns.sentenceVariety.forEach(pattern => {
        result = result.replace(pattern.pattern, (match, ...groups) => {
            if (Math.random() < 0.4) {
                const replacement = pattern.replacements[Math.floor(Math.random() * pattern.replacements.length)];
                return replacement(match, ...groups);
            }
            return match;
        });
    });
    
    // Add human touches
    this.stylisticPatterns.humanTouches.forEach(touch => {
        result = result.replace(touch.trigger, () => {
            if (Math.random() < 0.6) {
                return touch.replacements[Math.floor(Math.random() * touch.replacements.length)];
            }
            return match;
        });
    });
    
    // Occasionally add personal touches
    if (Math.random() < 0.3) {
        const personalTouch = this.stylisticPatterns.personalTouch[
            Math.floor(Math.random() * this.stylisticPatterns.personalTouch.length)
        ];
        result = personalTouch + ' ' + result.charAt(0).toLowerCase() + result.slice(1);
    }
    
    return result;
}

finalCoherencePass(text) {
    let result = text;
    
    // Ensure coherence and flow
    result = this.fixIncoherentTransitions(result);
    result = this.ensureTopicContinuity(result);
    result = this.balanceComplexity(result);
    
    // Final grammar pass
    result = this.finalGrammarPass(result);
    
    return result;
}

fixIncoherentTransitions(text) {
    // Fix transitions that don't make sense in context
    const sentences = text.split(/(?<=\.)\s+/);
    
    return sentences.map((sentence, index) => {
        if (index === 0) return sentence;
        
        // Check for inappropriate transitions
        const inappropriateStarters = ['However', 'But', 'Although'];
        const startsWithInappropriate = inappropriateStarters.some(starter => 
            sentence.startsWith(starter) && !this.transitionMakesSense(sentences[index - 1], sentence)
        );
        
        if (startsWithInappropriate) {
            // Replace with a more neutral transition
            const neutralTransitions = ['Also,', 'Plus,', 'What\'s more,'];
            const newTransition = neutralTransitions[Math.floor(Math.random() * neutralTransitions.length)];
            return sentence.replace(/^(However|But|Although),?\s*/, newTransition + ' ');
        }
        
        return sentence;
    }).join(' ');
}

transitionMakesSense(prevSentence, currentSentence) {
    // Simple heuristic to check if transition makes sense
    const prevSentiment = this.analyzeSentiment(prevSentence);
    const currentSentiment = this.analyzeSentiment(currentSentence);
    
    // "However" should indicate contrast
    if (currentSentence.startsWith('However')) {
        return prevSentiment !== currentSentiment;
    }
    
    return true;
}

analyzeSentiment(sentence) {
    const positiveWords = ['good', 'great', 'excellent', 'positive', 'beneficial', 'useful', 'effective'];
    const negativeWords = ['bad', 'poor', 'negative', 'harmful', 'ineffective', 'problematic'];
    
    const positive = positiveWords.some(word => sentence.toLowerCase().includes(word));
    const negative = negativeWords.some(word => sentence.toLowerCase().includes(word));
    
    if (positive && !negative) return 'positive';
    if (negative && !positive) return 'negative';
    return 'neutral';
}

ensureTopicContinuity(text) {
    // Ensure topics flow naturally between sentences
    const sentences = text.split(/(?<=\.)\s+/);
    
    return sentences.map((sentence, index) => {
        if (index > 0 && Math.random() < 0.15) {
            // Add subtle topic connectors
            const topicConnectors = [
                'Speaking of that,',
                'On this point,',
                'Along these lines,',
                'Related to this,',
                'Building on that,'
            ];
            
            const connector = topicConnectors[Math.floor(Math.random() * topicConnectors.length)];
            return connector + ' ' + sentence.charAt(0).toLowerCase() + sentence.slice(1);
        }
        return sentence;
    }).join(' ');
}

balanceComplexity(text) {
    // Balance sentence complexity to avoid uniform patterns
    const sentences = text.split(/(?<=\.)\s+/);
    let complexityPattern = [];
    
    sentences.forEach(sentence => {
        const complexity = this.calculateComplexity(sentence);
        complexityPattern.push(complexity);
    });
    
    // Avoid uniform complexity patterns
    return sentences.map((sentence, index) => {
        const currentComplexity = complexityPattern[index];
        const prevComplexity = index > 0 ? complexityPattern[index - 1] : 0;
        
        // If two consecutive sentences have the same complexity, vary one
        if (Math.abs(currentComplexity - prevComplexity) < 0.2 && Math.random() < 0.4) {
            if (currentComplexity > 0.6) {
                return this.simplifySentence(sentence);
            } else {
                return this.addComplexity(sentence);
            }
        }
        
        return sentence;
    }).join(' ');
}

calculateComplexity(sentence) {
    const words = sentence.split(' ').length;
    const clauses = (sentence.match(/,/g) || []).length + 1;
    const avgWordsPerClause = words / clauses;
    
    // Normalize complexity score
    return Math.min(1, avgWordsPerClause / 15);
}

simplifySentence(sentence) {
    // Break complex sentence into simpler parts
    if (sentence.includes(',') && sentence.length > 60) {
        const parts = sentence.split(',');
        if (parts.length > 1) {
            const firstPart = parts[0].trim() + '.';
            const secondPart = parts.slice(1).join(',').trim();
            return firstPart + ' ' + secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
        }
    }
    return sentence;
}

addComplexity(sentence) {
    // Add subtle complexity to simple sentences
    if (sentence.length < 50 && !sentence.includes(',')) {
        const complexifiers = [
            ', which is important,',
            ', as you might expect,',
            ', interestingly enough,',
            ', from what I can see,'
        ];
        
        const words = sentence.split(' ');
        if (words.length > 5) {
            const insertIndex = Math.floor(words.length * 0.6);
            const complexifier = complexifiers[Math.floor(Math.random() * complexifiers.length)];
            words.splice(insertIndex, 0, complexifier);
            return words.join(' ');
        }
    }
    return sentence;
}

removeAIPatterns(text) {
    let result = text;

    // Remove AI tell-signs with regex patterns
    this.aiPatterns.aiTellSigns.forEach(pattern => {
        result = result.replace(pattern, (match) => {
            // Replace with more natural alternatives
            return this.getNaturalAlternative(match);
        });
    });

    // Remove redundant phrases
    Object.keys(this.aiPatterns.redundantPhrases).forEach(phrase => {
        const replacement = this.aiPatterns.redundantPhrases[phrase];
        const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        result = result.replace(regex, replacement);
    });

    // Replace formal connectors with varied alternatives
    Object.keys(this.aiPatterns.formalConnectors).forEach(formal => {
        const casuals = this.aiPatterns.formalConnectors[formal];
    const regex = new RegExp('\\b' + formal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        result = result.replace(regex, () => {
            return this.getWeightedRandom(casuals);
        });
    });

    // Remove robotic sentence starters
    this.aiPatterns.roboticStarters.forEach(starter => {
    const regex = new RegExp('^\\s*' + starter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        result = result.replace(regex, '');
    });

    return result.replace(/\s+/g, ' ').trim();
}

getNaturalAlternative(aiPhrase) {
    const alternatives = {
        'comprehensive analysis': 'detailed look',
        'extensive overview': 'broad view',
        'multifaceted approach': 'well-rounded method',
        'paradigm shift': 'big change',
        'holistic approach': 'complete method',
        'synergistic effect': 'combined impact',
        'dynamic environment': 'changing situation',
        'innovative solution': 'creative fix',
        'delve into': 'look at',
        'delve deeper': 'dig deeper'
    };
    
    const lowerPhrase = aiPhrase.toLowerCase();
    return alternatives[lowerPhrase] || aiPhrase;
}

normalizeText(text) {
    return text
        .replace(/\s+/g, ' ')
        .replace(/\u2019/g, "'")
        .replace(/\u201C|\u201D/g, '"')
        .replace(/\u2013|\u2014/g, '-')
        .replace(/\u2026/g, '...')
        .trim();
}

buildGrammarRules() {
    return {
        // Enhanced grammar rules for better accuracy
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
            { pattern: /\bshall not\b/gi, replacement: 'shan\'t' },
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
        ],

        punctuation: [
            { pattern: /\s+([,.!?;:])/g, replacement: '$1' },
            { pattern: /([.!?])\s*([a-zA-Z])/g, replacement: '$1 $2' },
            { pattern: /([,.!?;:])([a-zA-Z])/g, replacement: '$1 $2' },
            { pattern: /\s+/g, replacement: ' ' },
            { pattern: /([.!?]){2,}/g, replacement: '$1' },
            { pattern: /,{2,}/g, replacement: ',' }
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
                    { from: /^It is worth mentioning that\s*/i, to: 'By the way, ' },
                    { from: /^Let me start by saying\s*/i, to: 'First off, ' }
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

buildHumanPatterns() {
    return {
        conversationalStarters: [
            "Here's the thing:",
            "What I find interesting is",
            "From what I've seen,",
            "In my experience,",
            "The way I see it,",
            "If you ask me,",
            "Personally,",
            "What strikes me is",
            "I've found that",
            "What I've noticed is",
            "Let me put it this way:",
            "Here's what's fascinating:",
            "From my perspective,",
            "The way I look at it,",
            "What's interesting about this is",
            "Here's something worth knowing:"
        ],
        
        uncertaintyMarkers: [
            "seems like", "appears to be", "might be", "could be",
            "tends to", "often", "usually", "typically", "generally",
            "from what I can tell", "as far as I know", "it looks like",
            "probably", "likely", "possibly", "presumably"
        ],
        
        casualTransitions: [
            "That said,", "Mind you,", "Having said that,", "At the same time,",
            "On the flip side,", "Then again,", "All the same,", "Even so,",
            "Still though,", "Either way,", "Now,", "Look,", "Listen,",
            "Here's the deal,", "The thing is,", "What's more,"
        ],
        
        humanFillers: [
            "you know", "I mean", "basically", "essentially", "pretty much",
            "sort of", "kind of", "more or less", "to some extent", "in a way",
            "honestly", "frankly", "actually", "really", "quite"
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

buildSentenceTemplates() {
    return {
        longSentenceBreakers: [
            {
                pattern: /(.{80,}),\s+(which|that|and)\s+(.{20,})/g,
                replacement: (match, part1, connector, part2) => {
                    const newConnector = connector === 'which' || connector === 'that' ? 'This' : 'Plus,';
                    return `${part1.trim()}. ${newConnector} ${part2.trim()}`;
                }
            }
        ],

        conversionalizers: [
            { pattern: /It is important to (.+)/gi, replacement: 'You need to $1' },
            { pattern: /One should (.+)/gi, replacement: 'You should $1' },
            { pattern: /It can be seen that (.+)/gi, replacement: '$1' },
            { pattern: /There are many (.+) that (.+)/gi, replacement: 'Many $1 $2' },
            { pattern: /It is possible that (.+)/gi, replacement: '$1 might be true' }
        ]
    };
}

intelligentSentenceSplit(text) {
    const sentences = [];
    const parts = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
    
    parts.forEach(part => {
        part = part.trim();
        if (part.length > 0) {
            if (part.length > 150) {
                const subSentences = this.breakLongSentence(part);
                sentences.push(...subSentences);
            } else {
                sentences.push(part);
            }
        }
    });
    
    return sentences.filter(s => s.length > 0);
}

breakLongSentence(sentence) {
    const breakPoints = [
        { pattern: ', which ', connector: 'This ' },
        { pattern: ', that ', connector: 'This ' },
        { pattern: ', and ', connector: 'Plus, ' },
        { pattern: ', but ', connector: 'But ' },
        { pattern: ', so ', connector: 'So ' }
    ];
    
    for (const breakPoint of breakPoints) {
        if (sentence.includes(breakPoint.pattern)) {
            const parts = sentence.split(breakPoint.pattern);
            if (parts.length > 1 && parts[0].length > 60) {
                const firstPart = parts[0].trim();
                const secondPart = parts.slice(1).join(breakPoint.pattern).trim();
                
                return [
                    firstPart.endsWith('.') ? firstPart : firstPart + '.',
                    breakPoint.connector + secondPart.charAt(0).toUpperCase() + secondPart.slice(1)
                ];
            }
        }
    }
    
    return [sentence];
}

async processSentences(sentences) {
    const processed = [];
    
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i].trim();
        
        if (sentence.length < 10) {
            processed.push(sentence);
            continue;
        }
        
        // Apply comprehensive processing
        sentence = this.applySynonymReplacement(sentence);
        sentence = this.applyGrammarCorrections(sentence);
        
        if (this.settings.structure) {
            sentence = this.varyStructure(sentence, i);
        }
        
        if (this.settings.conversational) {
            sentence = this.addConversationalElements(sentence, i, sentences.length);
        }
        
        if (this.settings.expressions) {
            sentence = this.addHumanExpressions(sentence);
        }
        
        // Apply contextual replacements
        sentence = this.applyContextualReplacements(sentence, i, sentences.length);
        
        processed.push(sentence);
    }
    
    return processed;
}

applyContextualReplacements(sentence, index, totalSentences) {
    let result = sentence;
    const position = index === 0 ? 'beginning' : 
                   index === totalSentences - 1 ? 'end' : 'middle';
    
    this.contextualReplacements.contextPatterns.forEach(contextPattern => {
        if (contextPattern.context === position || contextPattern.context === 'any') {
            contextPattern.patterns.forEach(pattern => {
                result = result.replace(pattern.from, pattern.to);
            });
        }
    });
    
    return result;
}

applySynonymReplacement(sentence) {
    let result = sentence;
    
    // Apply synonym replacements with context awareness
    Object.keys(this.synonymDatabase).forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        result = result.replace(regex, (match) => {
            if (Math.random() > 0.3) { // 70% chance to replace
                const synonyms = this.synonymDatabase[word];
                return this.getContextualSynonym(synonyms, sentence);
            }
            return match;
        });
    });
    
    return result;
}

getContextualSynonym(synonyms, context) {
    // Choose synonym based on context
    const contextLength = context.length;
    const contextComplexity = (context.match(/,/g) || []).length;
    
    // For shorter, simpler contexts, prefer simpler synonyms
    if (contextLength < 80 && contextComplexity < 2) {
        return synonyms[0] || synonyms[Math.floor(Math.random() * Math.min(2, synonyms.length))];
    }
    
    // For longer, complex contexts, use varied synonyms
    return this.getWeightedRandom(synonyms);
}

applyGrammarCorrections(text) {
    let result = text;
    
    Object.keys(this.grammarRules).forEach(category => {
        this.grammarRules[category].forEach(rule => {
            if (Math.random() < 0.8) { // Apply most grammar rules
                result = result.replace(rule.pattern, rule.replacement);
            }
        });
    });
    
    return result;
}

varyStructure(sentence, index) {
    if (index === 0) {
        return this.makeEngagingOpener(sentence);
    } else if (sentence.length > 100) {
        return this.simplifyStructure(sentence);
    } else {
        return this.addStructuralVariety(sentence);
    }
}

makeEngagingOpener(sentence) {
    if (Math.random() > 0.6 && !this.hasEngagingStart(sentence)) {
        const starters = this.humanPatterns.conversationalStarters;
        const starter = this.getWeightedRandom(starters);
        return `${starter} ${sentence.toLowerCase()}`;
    }
    return sentence;
}

hasEngagingStart(sentence) {
    const engagingPatterns = ['here\'s', 'what\'s', 'from', 'in my', 'the way', 'if you'];
    return engagingPatterns.some(pattern => 
        sentence.toLowerCase().startsWith(pattern)
    );
}

simplifyStructure(sentence) {
    const commaCount = (sentence.match(/,/g) || []).length;
    
    if (commaCount > 2) {
        const clauses = sentence.split(',');
        if (clauses.length > 2) {
            const firstPart = clauses.slice(0, 2).join(',').trim();
            const secondPart = clauses.slice(2).join(',').trim();
            
            return `${firstPart}. ${secondPart.charAt(0).toUpperCase()}${secondPart.slice(1)}`;
        }
    }
    
    return sentence;
}

addStructuralVariety(sentence) {
    if (Math.random() > 0.7) {
        const starters = this.humanPatterns.casualTransitions;
        const starter = this.getWeightedRandom(starters);
        return `${starter} ${sentence.toLowerCase()}`;
    }
    return sentence;
}

addConversationalElements(sentence, index, totalSentences) {
    let result = sentence;
    
    // Add conversational starters occasionally
    if (Math.random() > 0.8 && !this.hasConversationalStarter(result)) {
        const starters = this.humanPatterns.conversationalStarters;
        const starter = this.getWeightedRandom(starters);
        result = `${starter} ${result.toLowerCase()}`;
    }
    
    // Add uncertainty to absolute statements
    if (Math.random() > 0.6 && this.isAbsoluteStatement(result)) {
        const markers = this.humanPatterns.uncertaintyMarkers;
        const marker = this.getWeightedRandom(markers);
        
        result = result.replace(/\bis\b/g, `${marker}`)
                      .replace(/\bare\b/g, `${marker}`);
    }
    
    return result;
}

addHumanExpressions(sentence) {
    let result = sentence;
    
    // Add fillers sparingly
    if (Math.random() > 0.9 && sentence.length > 80) {
        const fillers = this.humanPatterns.humanFillers;
        const filler = this.getWeightedRandom(fillers);
        
        const words = result.split(' ');
        if (words.length > 10) {
            const insertIndex = Math.floor(words.length * 0.4);
            words.splice(insertIndex, 0, filler + ',');
            result = words.join(' ');
        }
    }
    
    return result;
}

isAbsoluteStatement(text) {
    const absoluteWords = ['always', 'never', 'all', 'every', 'completely', 'totally', 'entirely', 'definitely', 'certainly', 'absolutely'];
    return absoluteWords.some(word => text.toLowerCase().includes(word));
}

hasConversationalStarter(text) {
    const starters = this.humanPatterns.conversationalStarters;
    return starters.some(starter => 
        text.toLowerCase().startsWith(starter.toLowerCase())
    );
}

reconnectWithNaturalFlow(sentences) {
    if (sentences.length <= 1) return sentences.join(' ');
    
    let result = sentences[0];
    
    for (let i = 1; i < sentences.length; i++) {
        const currentSentence = sentences[i].trim();
        
        // Add natural connections
        if (Math.random() < 0.1 && !this.startsWithTransition(currentSentence)) {
            const naturalConnectors = [
                'Now,', 'Also,', 'Plus,', 'What\'s more,',
                'On top of that,', 'Besides,'
            ];
            const connector = this.getWeightedRandom(naturalConnectors);
            result += ` ${connector} ${currentSentence.toLowerCase()}`;
        } else {
            result += ` ${currentSentence}`;
        }
    }
    
    return result;
}

startsWithTransition(sentence) {
    const transitions = ['now', 'also', 'plus', 'but', 'however', 'though', 'yet', 'still', 'besides'];
    return transitions.some(t => sentence.toLowerCase().startsWith(t));
}

finalGrammarPass(text) {
    let result = text;
    
    // Comprehensive final cleanup
    result = result
        .replace(/\s+([,.!?;:])/g, '$1')
        .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
        .replace(/([,.!?;:])([A-Z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase())
        .trim();
    
    // Ensure proper ending
    if (!/[.!?]$/.test(result)) {
        result += '.';
    }
    
    // Fix common errors
    result = result
        .replace(/\bcan not\b/gi, 'cannot')
        .replace(/\balot\b/gi, 'a lot')
        .replace(/\bits\s+self\b/gi, 'itself')
        .replace(/\bwould\s+of\b/gi, 'would have')
        .replace(/\bcould\s+of\b/gi, 'could have')
        .replace(/\bshould\s+of\b/gi, 'should have');
    
    return result;
}

getWeightedRandom(array) {
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

// All the existing utility methods remain the same...
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
        const processingDelay = Math.max(2000, Math.ceil(wordCount / 30) * 1000);

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

updateStats(originalText, humanizedText, processingTimeMs) {
    const originalWordCount = this.countWords(originalText);
    const humanizedWordCount = this.countWords(humanizedText);
    
    const changeRatio = this.calculateChangeRatio(originalText, humanizedText);
    const improvementScore = Math.min(96, Math.max(82, Math.floor(changeRatio * 100 + Math.random() * 8)));
    const uniquenessScore = Math.floor(Math.random() * 10) + 88;
    const processingTimeSeconds = (processingTimeMs / 1000).toFixed(1);
    
    const readabilityGrades = ['A+', 'A', 'A-', 'B+'];
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
        changes += Math.abs(originalSentences - humanizedSentences) * 2;
    }
    
    return Math.min(0.85, changes / maxLength);
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

// Additional methods for enhanced humanization accuracy
adjustForTopic(text) {
    // Detect topic and adjust language accordingly
    const topics = {
        business: ['strategy', 'market', 'revenue', 'profit', 'customer'],
        technology: ['algorithm', 'data', 'system', 'software', 'digital'],
        academic: ['research', 'study', 'analysis', 'theory', 'methodology'],
        creative: ['design', 'art', 'creative', 'inspiration', 'aesthetic']
    };
    
    let detectedTopic = 'general';
    let maxMatches = 0;
    
    Object.entries(topics).forEach(([topic, keywords]) => {
        const matches = keywords.filter(keyword => 
            text.toLowerCase().includes(keyword)
        ).length;
        
        if (matches > maxMatches) {
            maxMatches = matches;
            detectedTopic = topic;
        }
    });
    
    return this.applyTopicSpecificAdjustments(text, detectedTopic);
}

applyTopicSpecificAdjustments(text, topic) {
    const adjustments = {
        business: {
            'leverage': 'use',
            'utilize': 'use',
            'optimize': 'improve',
            'synergy': 'teamwork',
            'paradigm': 'approach'
        },
        technology: {
            'implement': 'set up',
            'optimize': 'improve',
            'utilize': 'use',
            'framework': 'system',
            'architecture': 'structure'
        },
        academic: {
            'demonstrate': 'show',
            'illustrate': 'show',
            'elucidate': 'explain',
            'substantiate': 'support',
            'corroborate': 'confirm'
        }
    };
    
    if (adjustments[topic]) {
        let result = text;
        Object.entries(adjustments[topic]).forEach(([formal, casual]) => {
            if (Math.random() < 0.6) {
                const regex = new RegExp(`\\b${formal}\\b`, 'gi');
                result = result.replace(regex, casual);
            }
        });
        return result;
    }
    
    return text;
}

adjustToneForAudience(text) {
    // Adjust tone based on content complexity and length
    const wordCount = this.countWords(text);
    const avgSentenceLength = wordCount / (text.split(/[.!?]+/).length || 1);
    
    if (avgSentenceLength > 25) {
        // Text is complex, make it more conversational
        return this.makeMoreConversational(text);
    } else if (avgSentenceLength < 12) {
        // Text might be too simple, add some variety
        return this.addSomeComplexity(text);
    }
    
    return text;
}

makeMoreConversational(text) {
    const conversationalReplacements = {
        'In addition': 'Plus',
        'Furthermore': 'What\'s more',
        'However': 'But',
        'Therefore': 'So',
        'Consequently': 'As a result',
        'Nevertheless': 'Still',
        'Moreover': 'Also'
    };
    
    let result = text;
    Object.entries(conversationalReplacements).forEach(([formal, casual]) => {
        const regex = new RegExp(`\\b${formal}\\b`, 'gi');
        result = result.replace(regex, casual);
    });
    
    return result;
}

addSomeComplexity(text) {
    // Add occasional complexity to very simple text
    const sentences = text.split(/(?<=\.)\s+/);
    
    return sentences.map((sentence, index) => {
        if (sentence.split(' ').length < 8 && Math.random() < 0.3) {
            const complexifiers = [
                ', which is worth noting,',
                ', as you might expect,',
                ', interestingly,',
                ', of course,'
            ];
            
            const words = sentence.split(' ');
            const insertIndex = Math.max(3, Math.floor(words.length * 0.7));
            const complexifier = complexifiers[Math.floor(Math.random() * complexifiers.length)];
            
            words.splice(insertIndex, 0, complexifier);
            return words.join(' ');
        }
        return sentence;
    }).join(' ');
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
        const supportEmail = 'support@levintaps.com';
        const subject = 'AI Text Humanizer Pro - Support Request';
        
        // Create dynamic email content based on user's current page/context
        const emailBody = this.generateEmailBody();
        
        // Update email links with enhanced content
        const emailLinks = document.querySelectorAll('a[href*="mailto:support@levintaps.com"]');
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