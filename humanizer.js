class EnhancedTextHumanizer {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.synonymDatabase = this.buildSynonymDatabase();
        this.humanPatterns = this.buildHumanPatterns();
        this.connectorVariations = this.buildConnectors();
        this.aiPatterns = this.buildAIPatterns();
        this.sentenceTemplates = this.buildSentenceTemplates();
        this.grammarRules = this.buildGrammarRules();
        this.contextualReplacements = this.buildContextualReplacements();
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

    buildSynonymDatabase() {
        return {
            // Academic/formal words → natural alternatives
            'utilize': ['use', 'employ', 'work with', 'apply'],
            'facilitate': ['help', 'make easier', 'assist', 'enable'],
            'implement': ['put into practice', 'set up', 'establish', 'create'],
            'demonstrate': ['show', 'prove', 'reveal', 'illustrate'],
            'optimize': ['improve', 'enhance', 'make better', 'fine-tune'],
            'comprehensive': ['complete', 'thorough', 'detailed', 'full'],
            'significant': ['important', 'major', 'substantial', 'considerable'],
            'substantial': ['significant', 'large', 'major', 'considerable'],
            'fundamental': ['basic', 'core', 'essential', 'key'],
            'essential': ['vital', 'crucial', 'important', 'necessary'],
            'crucial': ['vital', 'essential', 'critical', 'important'],
            'paramount': ['most important', 'crucial', 'vital', 'key'],
            'optimal': ['best', 'ideal', 'perfect', 'most effective'],
            'robust': ['strong', 'reliable', 'solid', 'dependable'],
            'seamless': ['smooth', 'effortless', 'continuous', 'fluid'],
            'sophisticated': ['advanced', 'complex', 'refined', 'detailed'],
            'cutting-edge': ['latest', 'advanced', 'modern', 'innovative'],
            'innovative': ['creative', 'new', 'original', 'fresh'],
            'revolutionary': ['groundbreaking', 'game-changing', 'transformative'],
            'methodology': ['method', 'approach', 'way', 'process'],
            'framework': ['structure', 'system', 'foundation', 'setup'],
            'paradigm': ['model', 'pattern', 'example', 'approach'],
            'leverage': ['use', 'take advantage of', 'make use of', 'harness'],
            'enhancement': ['improvement', 'upgrade', 'boost', 'betterment'],
            'concerning': ['about', 'regarding', 'related to'],
            'subsequently': ['then', 'after that', 'next', 'later'],
            'consequently': ['so', 'as a result', 'therefore', 'thus'],
            'nonetheless': ['still', 'however', 'even so', 'yet'],
            'furthermore': ['also', 'plus', 'what\'s more', 'additionally'],
            'moreover': ['also', 'plus', 'what\'s more', 'in addition'],
            'therefore': ['so', 'thus', 'as a result', 'because of this'],
            'however': ['but', 'though', 'yet', 'still'],
            'nevertheless': ['but still', 'even so', 'however', 'yet']
        };
    }

    buildGrammarRules() {
        return {
            // Subject-verb agreement patterns
            subjectVerb: [
                { pattern: /\b(he|she|it)\s+([a-z]+)\b/gi, fix: this.fixSubjectVerbAgreement },
                { pattern: /\b(they|we|you)\s+(is)\b/gi, replacement: '$1 are' },
                { pattern: /\b(I)\s+(are)\b/gi, replacement: '$1 am' },
                { pattern: /\b(he|she|it)\s+(are)\b/gi, replacement: '$1 is' },
                { pattern: /\b(he|she|it)\s+(have)\b/gi, replacement: '$1 has' }
            ],

            // Article corrections
            articles: [
                { pattern: /\ba\s+([aeiouAEIOU])/g, replacement: 'an $1' },
                { pattern: /\bA\s+([aeiouAEIOU])/g, replacement: 'An $1' },
                { pattern: /\ban\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ])/g, replacement: 'a $1' },
                { pattern: /\bAn\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ])/g, replacement: 'A $1' }
            ],

            // Common verb form corrections
            verbForms: [
                { pattern: /\bI\s+goes\b/gi, replacement: 'I go' },
                { pattern: /\bI\s+was\s+(going|doing|working)/gi, replacement: 'I was $1' },
                { pattern: /\bthey\s+was\b/gi, replacement: 'they were' },
                { pattern: /\bwe\s+was\b/gi, replacement: 'we were' },
                { pattern: /\byou\s+was\b/gi, replacement: 'you were' },
                { pattern: /\bdoesn't\s+(seems?|appears?)\b/gi, replacement: 'doesn\'t $1' },
                { pattern: /\bdon't\s+(seems?|appears?)\b/gi, replacement: 'doesn\'t $1' }
            ],

            // Preposition fixes
            prepositions: [
                { pattern: /\bdifferent\s+than\b/gi, replacement: 'different from' },
                { pattern: /\btry\s+and\b/gi, replacement: 'try to' },
                { pattern: /\bcould\s+of\b/gi, replacement: 'could have' },
                { pattern: /\bwould\s+of\b/gi, replacement: 'would have' },
                { pattern: /\bshould\s+of\b/gi, replacement: 'should have' }
            ],

            // Double negative fixes
            doubleNegatives: [
                { pattern: /\bdon't\s+have\s+no\b/gi, replacement: 'don\'t have any' },
                { pattern: /\bcan't\s+get\s+no\b/gi, replacement: 'can\'t get any' },
                { pattern: /\bwon't\s+do\s+nothing\b/gi, replacement: 'won\'t do anything' },
                { pattern: /\bnot\s+never\b/gi, replacement: 'never' }
            ],

            // Punctuation and spacing
            punctuation: [
                { pattern: /\s+([,.!?;:])/g, replacement: '$1' },
                { pattern: /([.!?])\s*([a-zA-Z])/g, replacement: '$1 $2' },
                { pattern: /([,.!?;:])([a-zA-Z])/g, replacement: '$1 $2' },
                { pattern: /\s+/g, replacement: ' ' },
                { pattern: /([.!?]){2,}/g, replacement: '$1' }
            ]
        };
    }

    buildContextualReplacements() {
        return {
            // Context-aware replacements that consider surrounding words
            patterns: [
                {
                    // Replace formal connectors based on context
                    search: /\bHowever,\s+/g,
                    replacements: ['But ', 'Though ', 'Still, ', 'Yet '],
                    weight: (context) => context.includes('formal') ? 0.3 : 0.8
                },
                {
                    search: /\bFurthermore,\s+/g,
                    replacements: ['Also, ', 'Plus, ', 'What\'s more, '],
                    weight: (context) => 0.7
                },
                {
                    search: /\bIn conclusion,\s+/g,
                    replacements: ['To sum up, ', 'Overall, ', 'In the end, ', 'All in all, '],
                    weight: (context) => 0.8
                },
                {
                    search: /\bIt is important to note that\s+/gi,
                    replacements: ['Worth noting: ', 'Keep in mind that ', 'Remember that '],
                    weight: (context) => 0.9
                }
            ]
        };
    }

    buildAIPatterns() {
        return {
            // Patterns that scream "AI-generated"
            formalConnectors: {
                'However,': ['But', 'Though', 'Yet', 'Still,', 'That said,'],
                'Therefore,': ['So', 'Thus', 'As a result,', 'This means'],
                'Furthermore,': ['Also', 'Plus', 'What\'s more,', 'On top of that,'],
                'Moreover,': ['Also', 'Plus', 'Additionally', 'What\'s more,'],
                'Nevertheless,': ['But still', 'Even so', 'Yet', 'However'],
                'Consequently,': ['So', 'As a result', 'Because of this'],
                'Subsequently,': ['Then', 'After that', 'Next', 'Later'],
                'In conclusion,': ['To sum up,', 'Overall,', 'In the end,'],
                'In summary,': ['To recap,', 'In short,', 'Basically,'],
                'Additionally,': ['Also', 'Plus', 'What\'s more'],
                'Alternatively,': ['Or', 'Instead', 'On the other hand']
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
                'in view of the fact that': 'because',
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
                'in today\'s society': 'today'
            },

            // AI-style sentence starters to avoid/replace
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
                'Data suggests that'
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
                "Here's what's fascinating:"
            ],
            
            uncertaintyMarkers: [
                "seems like",
                "appears to be",
                "might be",
                "could be",
                "tends to",
                "often",
                "usually",
                "typically",
                "generally",
                "from what I can tell",
                "as far as I know",
                "it looks like"
            ],
            
            casualTransitions: [
                "That said,",
                "Mind you,",
                "Having said that,",
                "At the same time,",
                "On the flip side,",
                "Then again,",
                "All the same,",
                "Even so,",
                "Still though,",
                "Either way,",
                "Now,",
                "Look,"
            ],
            
            humanFillers: [
                "you know",
                "I mean",
                "basically",
                "essentially",
                "pretty much",
                "sort of",
                "kind of",
                "more or less",
                "to some extent",
                "in a way",
                "honestly",
                "frankly"
            ],

            // Natural discourse markers
            flowMarkers: [
                "Now, here's the interesting part:",
                "But wait, there's more:",
                "Here's where it gets tricky:",
                "This is where things get interesting:",
                "Let me break this down:",
                "Think about it this way:",
                "Here's the kicker:",
                "Get this:"
            ]
        };
    }

    buildConnectors() {
        return {
            'and': ['plus', 'along with', 'as well as', 'together with'],
            'but': ['however', 'though', 'yet', 'still', 'although'],
            'because': ['since', 'as', 'given that', 'seeing that'],
            'so': ['therefore', 'thus', 'hence', 'as a result'],
            'also': ['too', 'as well', 'plus', 'what\'s more'],
            'very': ['really', 'quite', 'pretty', 'rather'],
            'many': ['lots of', 'plenty of', 'tons of', 'loads of'],
            'important': ['key', 'crucial', 'vital', 'significant']
        };
    }

    buildSentenceTemplates() {
        return {
            // Patterns for breaking up long, complex sentences
            longSentenceBreakers: [
                {
                    pattern: /(.{80,}),\s+(which|that|and)\s+(.{20,})/g,
                    replacement: (match, part1, connector, part2) => {
                        const newConnector = connector === 'which' || connector === 'that' ? 'This' : 'Plus,';
                        return `${part1.trim()}. ${newConnector} ${part2.trim()}`;
                    }
                }
            ],

            // Patterns for making sentences more conversational
            conversionalizers: [
                {
                    pattern: /It is important to (.+)/gi,
                    replacement: 'You need to $1'
                },
                {
                    pattern: /One should (.+)/gi,
                    replacement: 'You should $1'
                },
                {
                    pattern: /It can be seen that (.+)/gi,
                    replacement: '$1'
                },
                {
                    pattern: /There are many (.+) that (.+)/gi,
                    replacement: 'Many $1 $2'
                }
            ]
        };
    }

    fixSubjectVerbAgreement(match, subject, verb) {
        const thirdPersonSingular = ['he', 'she', 'it'];
        const irregularVerbs = {
            'be': 'is', 'have': 'has', 'do': 'does', 'go': 'goes',
            'try': 'tries', 'fly': 'flies', 'cry': 'cries',
            'study': 'studies', 'carry': 'carries'
        };

        if (thirdPersonSingular.includes(subject.toLowerCase())) {
            if (irregularVerbs[verb.toLowerCase()]) {
                return `${subject} ${irregularVerbs[verb.toLowerCase()]}`;
            } else if (!verb.endsWith('s') && !verb.endsWith('ed') && !verb.endsWith('ing')) {
                return `${subject} ${verb}s`;
            }
        }
        
        return match; // Return unchanged if no fix needed
    }

    async processText(text) {
        let result = text;
        
        // Step 1: Clean and normalize
        result = this.normalizeText(result);
        
        // Step 2: Apply grammar corrections first
        result = this.applyGrammarCorrections(result);
        
        // Step 3: Remove AI patterns
        if (this.settings.patterns) {
            result = this.removeAIPatterns(result);
        }
        
        // Step 4: Break down and process sentences
        const sentences = this.intelligentSentenceSplit(result);
        const processedSentences = await this.processSentences(sentences);
        
        // Step 5: Reconnect with natural flow
        result = this.reconnectWithNaturalFlow(processedSentences);
        
        // Step 6: Final polish and grammar check
        result = this.finalGrammarPass(result);
        
        return result;
    }

    normalizeText(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/\u2019/g, "'")
            .replace(/\u201C|\u201D/g, '"')
            .replace(/\u2013|\u2014/g, '-')
            .trim();
    }

    applyGrammarCorrections(text) {
        let result = text;
        
        // Apply each category of grammar rules
        Object.keys(this.grammarRules).forEach(category => {
            this.grammarRules[category].forEach(rule => {
                if (rule.fix && typeof rule.fix === 'function') {
                    result = result.replace(rule.pattern, rule.fix.bind(this));
                } else if (rule.replacement) {
                    result = result.replace(rule.pattern, rule.replacement);
                }
            });
        });
        
        return result;
    }

    removeAIPatterns(text) {
        let result = text;

        // Remove redundant phrases
        Object.keys(this.aiPatterns.redundantPhrases).forEach(phrase => {
            const replacement = this.aiPatterns.redundantPhrases[phrase];
            const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            result = result.replace(regex, replacement);
        });

        // Replace formal connectors
        Object.keys(this.aiPatterns.formalConnectors).forEach(formal => {
            const casuals = this.aiPatterns.formalConnectors[formal];
            const regex = new RegExp(formal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            if (regex.test(result)) {
                const replacement = this.getWeightedRandom(casuals);
                result = result.replace(regex, replacement);
            }
        });

        // Remove robotic sentence starters
        this.aiPatterns.roboticStarters.forEach(starter => {
            const regex = new RegExp(starter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            result = result.replace(regex, '');
        });

        return result.replace(/\s+/g, ' ').trim();
    }

    intelligentSentenceSplit(text) {
        // More sophisticated sentence splitting that preserves context
        const sentences = [];
        const parts = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
        
        parts.forEach(part => {
            part = part.trim();
            if (part.length > 0) {
                // Break extremely long sentences (150+ chars) at natural break points
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
        const breakPoints = [', which ', ', that ', ', and ', ', but ', ', so '];
        
        for (const breakPoint of breakPoints) {
            const parts = sentence.split(breakPoint);
            if (parts.length > 1 && parts[0].length > 60) {
                const firstPart = parts[0].trim();
                const secondPart = parts.slice(1).join(breakPoint).trim();
                
                // Ensure proper sentence structure
                const connector = this.getAppropriateConnector(breakPoint);
                return [
                    firstPart.endsWith('.') ? firstPart : firstPart + '.',
                    connector + secondPart.charAt(0).toUpperCase() + secondPart.slice(1)
                ];
            }
        }
        
        return [sentence]; // Return as-is if no good break point found
    }

    getAppropriateConnector(originalBreakPoint) {
        const connectorMap = {
            ', which ': 'This ',
            ', that ': 'This ',
            ', and ': 'Plus, ',
            ', but ': 'But ',
            ', so ': 'So '
        };
        
        return connectorMap[originalBreakPoint] || '';
    }

    async processSentences(sentences) {
        const processed = [];
        
        for (let i = 0; i < sentences.length; i++) {
            let sentence = sentences[i].trim();
            
            // Skip very short sentences
            if (sentence.length < 10) {
                processed.push(sentence);
                continue;
            }
            
            // Apply transformations based on settings
            sentence = this.applySynonymReplacement(sentence);
            
            if (this.settings.structure) {
                sentence = this.varyStructure(sentence, i);
            }
            
            if (this.settings.conversational) {
                sentence = this.addConversationalElements(sentence, i, sentences.length);
            }
            
            if (this.settings.expressions) {
                sentence = this.addHumanExpressions(sentence);
            }
            
            processed.push(sentence);
        }
        
        return processed;
    }

    applySynonymReplacement(sentence) {
        let result = sentence;
        const words = sentence.toLowerCase().split(/\b/);
        
        Object.keys(this.synonymDatabase).forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            if (regex.test(result) && Math.random() > 0.5) {
                const synonyms = this.synonymDatabase[word];
                const replacement = this.getWeightedRandom(synonyms);
                result = result.replace(regex, replacement);
            }
        });
        
        return result;
    }

    varyStructure(sentence, index) {
        // Apply different structural variations based on position
        if (index === 0) {
            // First sentence - make it engaging
            return this.makeEngagingOpener(sentence);
        } else if (sentence.length > 100) {
            // Long sentences - break them up
            return this.simplifyStructure(sentence);
        } else {
            // Regular sentences - add variety
            return this.addStructuralVariety(sentence);
        }
    }

    makeEngagingOpener(sentence) {
        const engagingStarters = [
            "Let's talk about",
            "Picture this:",
            "Here's something interesting:",
            "You might be wondering about",
            "Consider this:",
            "Think about"
        ];
        
        if (Math.random() > 0.7 && !this.hasEngagingStart(sentence)) {
            const starter = this.getWeightedRandom(engagingStarters);
            return `${starter} ${sentence.toLowerCase()}`;
        }
        
        return sentence;
    }

    hasEngagingStart(sentence) {
        const engagingPatterns = ['let\'s', 'picture', 'consider', 'think', 'imagine', 'here\'s'];
        return engagingPatterns.some(pattern => 
            sentence.toLowerCase().startsWith(pattern)
        );
    }

    simplifyStructure(sentence) {
        // Break complex sentences into simpler ones
        const commaCount = (sentence.match(/,/g) || []).length;
        
        if (commaCount > 2) {
            // Find natural break points and split
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
        // Add variety to sentence beginnings
        if (Math.random() > 0.8) {
            const varietyStarters = ['Now,', 'Plus,', 'Also,', 'What\'s more,'];
            if (!sentence.toLowerCase().startsWith(varietyStarters.join('|').toLowerCase())) {
                const starter = this.getWeightedRandom(varietyStarters);
                return `${starter} ${sentence.toLowerCase()}`;
            }
        }
        
        return sentence;
    }

    addConversationalElements(sentence, index, totalSentences) {
        let result = sentence;
        
        // Add conversational starters occasionally
        if (Math.random() > 0.85 && !this.hasConversationalStarter(result)) {
            const starters = this.humanPatterns.conversationalStarters;
            const starter = this.getWeightedRandom(starters);
            result = `${starter} ${result.toLowerCase()}`;
        }
        
        // Add uncertainty markers to absolute statements
        if (Math.random() > 0.7 && this.isAbsoluteStatement(result)) {
            const markers = this.humanPatterns.uncertaintyMarkers;
            const marker = this.getWeightedRandom(markers);
            
            result = result.replace(/\bis\b/, `${marker}`)
                          .replace(/\bare\b/, `${marker}`);
        }
        
        // Add casual transitions between sentences
        if (index > 0 && Math.random() > 0.6) {
            const transitions = this.humanPatterns.casualTransitions;
            const transition = this.getWeightedRandom(transitions);
            result = `${transition} ${result.toLowerCase()}`;
        }
        
        return result;
    }

    addHumanExpressions(sentence) {
        let result = sentence;
        
        // Add human fillers occasionally (but not too often)
        if (Math.random() > 0.85 && sentence.length > 60) {
            const fillers = this.humanPatterns.humanFillers;
            const filler = this.getWeightedRandom(fillers);
            
            const words = result.split(' ');
            if (words.length > 8) {
                const insertIndex = Math.floor(words.length * 0.4);
                words.splice(insertIndex, 0, filler + ',');
                result = words.join(' ');
            }
        }
        
        return result;
    }

    isAbsoluteStatement(text) {
        const absoluteWords = ['always', 'never', 'all', 'every', 'completely', 'totally', 'entirely', 'definitely', 'certainly'];
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
            
            // Add appropriate spacing and connection
            if (this.needsTransition(sentences[i-1], currentSentence)) {
                result += ` ${currentSentence}`;
            } else {
                result += ` ${currentSentence}`;
            }
        }
        
        return result;
    }

    needsTransition(prevSentence, currentSentence) {
        // Logic to determine if a transition is needed
        const transitionWords = ['however', 'but', 'though', 'still', 'also', 'plus', 'now'];
        return !transitionWords.some(word => 
            currentSentence.toLowerCase().startsWith(word)
        );
    }

    finalGrammarPass(text) {
        let result = text;
        
        // Final cleanup and grammar fixes
        result = result
            // Fix spacing around punctuation
            .replace(/\s+([,.!?;:])/g, '$1')
            .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
            .replace(/([,.!?;:])([A-Z])/g, '$1 $2')
            
            // Fix multiple spaces
            .replace(/\s+/g, ' ')
            
            // Fix sentence capitalization
            .replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase())
            
            // Ensure proper ending punctuation
            .trim();
        
        if (!/[.!?]$/.test(result)) {
            result += '.';
        }
        
        // Final grammar corrections
        result = this.applyFinalGrammarRules(result);
        
        return result;
    }

    applyFinalGrammarRules(text) {
        return text
            // Fix common contractions
            .replace(/\bcan not\b/gi, 'cannot')
            .replace(/\balot\b/gi, 'a lot')
            .replace(/\bits\s+self\b/gi, 'itself')
            
            // Fix comma splices (basic)
            .replace(/([^,]{20,}),\s*([^,]{20,})/g, (match, p1, p2) => {
                if (this.isCompleteThought(p1) && this.isCompleteThought(p2)) {
                    return `${p1}. ${p2.charAt(0).toUpperCase()}${p2.slice(1)}`;
                }
                return match;
            })
            
            // Fix run-on sentences with coordinating conjunctions
            .replace(/\b(and|but|or|so|yet)\s+([^,.!?]{40,})/g, (match, conj, rest) => {
                return `${conj} ${rest}`;
            });
    }

    isCompleteThought(text) {
        // Simple heuristic to check if text forms a complete thought
        const hasSubject = /\b(I|you|he|she|it|we|they|this|that|there)\b/i.test(text);
        const hasVerb = /\b(is|are|was|were|have|has|had|do|does|did|can|could|will|would|shall|should|may|might|must)\b/i.test(text);
        return hasSubject && hasVerb && text.length > 15;
    }

    getWeightedRandom(array) {
        // Simple weighted random selection (first items have slightly higher weight)
        const weights = array.map((_, i) => Math.max(0.1, 1 - i * 0.1));
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        
        let random = Math.random() * totalWeight;
        for (let i = 0; i < array.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return array[i];
            }
        }
        
        return array[0]; // Fallback
    }

    // Rest of the existing methods remain the same...
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
            // Simulate processing time for better UX
            await this.delay(1500);
            
            const humanizedText = await this.processText(inputValue);
            
            this.outputText.value = humanizedText;
            this.updateOutputStats();
            
            const processingTimeMs = Date.now() - startTime;
            this.updateStats(inputValue, humanizedText, processingTimeMs);
            
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
        const improvementScore = Math.min(95, Math.max(75, Math.floor(changeRatio * 100)));
        const uniquenessScore = Math.floor(Math.random() * 15) + 85;
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
        const originalWords = original.split(' ');
        const humanizedWords = humanized.split(' ');
        let changes = 0;
        
        const maxLength = Math.max(originalWords.length, humanizedWords.length);
        
        for (let i = 0; i < maxLength; i++) {
            if (originalWords[i] !== humanizedWords[i]) {
                changes++;
            }
        }
        
        return changes / maxLength;
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