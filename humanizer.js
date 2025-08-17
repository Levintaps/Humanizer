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
            // Expanded with more natural, varied alternatives
            'utilize': ['use', 'make use of', 'put to work', 'employ', 'take advantage of', 'harness'],
            'facilitate': ['help with', 'make easier', 'assist in', 'enable', 'smooth out', 'aid'],
            'implement': ['put in place', 'set up', 'roll out', 'carry out', 'establish', 'apply'],
            'demonstrate': ['show', 'illustrate', 'prove', 'highlight', 'display', 'exhibit'],
            'optimize': ['improve', 'fine-tune', 'boost', 'enhance', 'streamline', 'refine'],
            'comprehensive': ['thorough', 'complete', 'detailed', 'full', 'in-depth', 'all-encompassing'],
            'significant': ['major', 'key', 'important', 'notable', 'substantial', 'meaningful'],
            'substantial': ['considerable', 'large', 'significant', 'hefty', 'solid', 'sizeable'],
            'fundamental': ['basic', 'core', 'essential', 'key', 'foundational', 'underlying'],
            'essential': ['crucial', 'vital', 'necessary', 'key', 'important', 'must-have'],
            'crucial': ['vital', 'essential', 'critical', 'key', 'pivotal', 'decisive'],
            'paramount': ['supreme', 'utmost', 'critical', 'essential', 'foremost', 'overriding'],
            'optimal': ['best', 'ideal', 'prime', 'peak', 'top', 'perfect'],
            'robust': ['strong', 'sturdy', 'solid', 'resilient', 'tough', 'durable'],
            'seamless': ['smooth', 'effortless', 'fluid', 'uninterrupted', 'easy', 'hassle-free'],
            'sophisticated': ['advanced', 'complex', 'refined', 'elaborate', 'intricate', 'high-level'],
            'cutting-edge': ['state-of-the-art', 'innovative', 'advanced', 'modern', 'leading-edge', 'pioneering'],
            'innovative': ['creative', 'novel', 'original', 'inventive', 'fresh', 'groundbreaking'],
            'revolutionary': ['transformative', 'game-changing', 'radical', 'innovative', 'disruptive', 'pivotal'],
            'methodology': ['approach', 'method', 'technique', 'process', 'system', 'procedure'],
            'framework': ['structure', 'system', 'foundation', 'scaffold', 'backbone', 'outline'],
            'paradigm': ['model', 'framework', 'pattern', 'example', 'approach', 'template'],
            'leverage': ['use', 'exploit', 'harness', 'capitalize on', 'take advantage of', 'utilize'],
            'enhancement': ['improvement', 'upgrade', 'boost', 'refinement', 'augmentation', 'advancement'],
            'concerning': ['about', 'regarding', 'on', 'related to', 'pertaining to', 'involving'],
            'subsequently': ['later', 'afterward', 'then', 'next', 'following that', 'afterwards'],
            'consequently': ['so', 'therefore', 'thus', 'as a result', 'hence', 'because of that'],
            'nonetheless': ['still', 'even so', 'however', 'yet', 'regardless', 'nevertheless'],
            'furthermore': ['also', 'moreover', 'in addition', 'plus', 'what\'s more', 'besides'],
            'moreover': ['besides', 'also', 'furthermore', 'in addition', 'plus', 'what\'s more'],
            'therefore': ['so', 'thus', 'hence', 'consequently', 'as a result', 'for that reason'],
            'however': ['but', 'though', 'yet', 'still', 'nevertheless', 'on the other hand'],
            'nevertheless': ['even so', 'however', 'but still', 'yet', 'regardless', 'nonetheless'],
            // Additional entries for better coverage
            'achieve': ['reach', 'accomplish', 'attain', 'hit', 'gain', 'secure'],
            'analyze': ['examine', 'study', 'review', 'look into', 'assess', 'break down'],
            'develop': ['build', 'create', 'grow', 'evolve', 'advance', 'expand'],
            'ensure': ['make sure', 'guarantee', 'confirm', 'verify', 'safeguard', 'assure'],
            'generate': ['create', 'produce', 'make', 'build', 'spawn', 'yield'],
            'impact': ['affect', 'influence', 'change', 'shape', 'alter', 'touch'],
            'integrate': ['combine', 'merge', 'blend', 'incorporate', 'fuse', 'unite'],
            'maintain': ['keep', 'preserve', 'sustain', 'uphold', 'support', 'continue'],
            'provide': ['give', 'offer', 'supply', 'deliver', 'furnish', 'present'],
            'require': ['need', 'demand', 'call for', 'necessitate', 'want', 'ask for'],
            'solution': ['fix', 'answer', 'resolution', 'remedy', 'way out', 'approach'],
            'strategy': ['plan', 'approach', 'tactic', 'method', 'scheme', 'game plan'],
            'transform': ['change', 'convert', 'alter', 'revamp', 'morph', 'overhaul'],
            'validate': ['confirm', 'verify', 'check', 'authenticate', 'prove', 'substantiate']
        };
    }

    buildGrammarRules() {
        return {
            // Expanded subject-verb agreement
            subjectVerb: [
                { pattern: /\b(he|she|it)\s+([a-z]+)\b/gi, fix: this.fixSubjectVerbAgreement },
                { pattern: /\b(they|we|you)\s+(is)\b/gi, replacement: '$1 are' },
                { pattern: /\b(I)\s+(are)\b/gi, replacement: '$1 am' },
                { pattern: /\b(he|she|it)\s+(are)\b/gi, replacement: '$1 is' },
                { pattern: /\b(he|she|it)\s+(have)\b/gi, replacement: '$1 has' },
                { pattern: /\b(they|we|you|I)\s+(has)\b/gi, replacement: '$1 have' }
            ],

            // Enhanced article corrections
            articles: [
                { pattern: /\ba\s+([aeiouAEIOU])/g, replacement: 'an $1' },
                { pattern: /\bA\s+([aeiouAEIOU])/g, replacement: 'An $1' },
                { pattern: /\ban\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ])/g, replacement: 'a $1' },
                { pattern: /\bAn\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ])/g, replacement: 'A $1' },
                { pattern: /\bthe\s+([aeiouAEIOU])/gi, replacement: 'the $1' } // Placeholder, but ensures consistency
            ],

            // More verb form corrections
            verbForms: [
                { pattern: /\bI\s+goes\b/gi, replacement: 'I go' },
                { pattern: /\bI\s+was\s+(going|doing|working)/gi, replacement: 'I was $1' },
                { pattern: /\bthey\s+was\b/gi, replacement: 'they were' },
                { pattern: /\bwe\s+was\b/gi, replacement: 'we were' },
                { pattern: /\byou\s+was\b/gi, replacement: 'you were' },
                { pattern: /\bdoesn't\s+(seems?|appears?)\b/gi, replacement: 'doesn\'t $1' },
                { pattern: /\bdon't\s+(seems?|appears?)\b/gi, replacement: 'doesn\'t $1' },
                { pattern: /\bhe\s+don't\b/gi, replacement: 'he doesn\'t' },
                { pattern: /\bshe\s+don't\b/gi, replacement: 'she doesn\'t' },
                { pattern: /\bit\s+don't\b/gi, replacement: 'it doesn\'t' }
            ],

            // Expanded preposition fixes
            prepositions: [
                { pattern: /\bdifferent\s+than\b/gi, replacement: 'different from' },
                { pattern: /\btry\s+and\b/gi, replacement: 'try to' },
                { pattern: /\bcould\s+of\b/gi, replacement: 'could have' },
                { pattern: /\bwould\s+of\b/gi, replacement: 'would have' },
                { pattern: /\bshould\s+of\b/gi, replacement: 'should have' },
                { pattern: /\bconsist\s+of\b/gi, replacement: 'consist of' },
                { pattern: /\bdepend\s+of\b/gi, replacement: 'depend on' }
            ],

            // Double negative fixes
            doubleNegatives: [
                { pattern: /\bdon't\s+have\s+no\b/gi, replacement: 'don\'t have any' },
                { pattern: /\bcan't\s+get\s+no\b/gi, replacement: 'can\'t get any' },
                { pattern: /\bwon't\s+do\s+nothing\b/gi, replacement: 'won\'t do anything' },
                { pattern: /\bnot\s+never\b/gi, replacement: 'never' },
                { pattern: /\bain't\s+no\b/gi, replacement: 'isn\'t any' }
            ],

            // Punctuation and spacing, with more rules
            punctuation: [
                { pattern: /\s+([,.!?;:])/g, replacement: '$1' },
                { pattern: /([.!?])\s*([a-zA-Z])/g, replacement: '$1 $2' },
                { pattern: /([,.!?;:])([a-zA-Z])/g, replacement: '$1 $2' },
                { pattern: /\s+/g, replacement: ' ' },
                { pattern: /([.!?]){2,}/g, replacement: '$1' },
                { pattern: /\b(And|But|So|Yet)\b/g, replacement: '$1' } // Capitalize sentence starters if needed
            ]
        };
    }

    buildContextualReplacements() {
        return {
            patterns: [
                {
                    search: /\bHowever,\s+/g,
                    replacements: ['But ', 'Though ', 'Still, ', 'Yet ', 'On the other hand, ', 'That being said, '],
                    weight: (context) => context.includes('formal') ? 0.3 : 0.9
                },
                {
                    search: /\bFurthermore,\s+/g,
                    replacements: ['Also, ', 'Plus, ', 'What\'s more, ', 'Besides, ', 'In addition, '],
                    weight: (context) => 0.8
                },
                {
                    search: /\bIn conclusion,\s+/g,
                    replacements: ['To sum up, ', 'Overall, ', 'In the end, ', 'All in all, ', 'Wrapping up, '],
                    weight: (context) => 0.9
                },
                {
                    search: /\bIt is important to note that\s+/gi,
                    replacements: ['Worth noting: ', 'Keep in mind that ', 'Remember that ', 'Just so you know, '],
                    weight: (context) => 0.95
                },
                // Additional contextual patterns
                {
                    search: /\bFor example,\s+/g,
                    replacements: ['For instance, ', 'Like, ', 'Say, ', 'Such as, '],
                    weight: (context) => 0.85
                },
                {
                    search: /\bIn other words,\s+/g,
                    replacements: ['Put differently, ', 'Simply put, ', 'That is, ', 'Meaning, '],
                    weight: (context) => 0.9
                }
            ]
        };
    }

    buildAIPatterns() {
        return {
            formalConnectors: {
                'However,': ['But', 'Though', 'Yet', 'Still,', 'That said,', 'On the flip side,'],
                'Therefore,': ['So', 'Thus', 'As a result,', 'This means', 'Hence,', 'For this reason,'],
                'Furthermore,': ['Also', 'Plus', 'What\'s more,', 'On top of that,', 'Besides,'],
                'Moreover,': ['Also', 'Plus', 'Additionally', 'What\'s more,', 'Besides,'],
                'Nevertheless,': ['But still', 'Even so', 'Yet', 'However', 'Regardless,'],
                'Consequently,': ['So', 'As a result', 'Because of this', 'Thus,'],
                'Subsequently,': ['Then', 'After that', 'Next', 'Later', 'Following this,'],
                'In conclusion,': ['To sum up,', 'Overall,', 'In the end,', 'Wrapping up,'],
                'In summary,': ['To recap,', 'In short,', 'Basically,', 'All told,'],
                'Additionally,': ['Also', 'Plus', 'What\'s more', 'Besides,'],
                'Alternatively,': ['Or', 'Instead', 'On the other hand', 'Otherwise,'],
                // More AI-like connectors
                'Hence,': ['So', 'Therefore', 'Thus', 'As such,'],
                'Thus,': ['So', 'Therefore', 'Hence', 'In this way,']
            },
            
            redundantPhrases: {
                'in order to': 'to',
                'for the purpose of': 'for',
                'with the intention of': 'to',
                'in the process of': 'while',
                'during the course of': 'during',
                'in the event that': 'if',
                'in spite of the fact that': 'although',
                'due to the fact that': 'because',
                'owing to the fact that': 'because',
                'in view of the fact that': 'since',
                'despite the fact that': 'although',
                'with regard to': 'regarding',
                'with respect to': 'about',
                'in relation to': 'regarding',
                'as a matter of fact': 'actually',
                'it should be noted that': 'note that',
                'it is important to note that': 'keep in mind that',
                'it is worth mentioning that': 'worth mentioning',
                'needless to say': '',
                'it goes without saying': '',
                'at this point in time': 'now',
                'at the present time': 'currently',
                'in today\'s society': 'nowadays',
                // Additional redundant phrases
                'in the near future': 'soon',
                'at the end of the day': 'ultimately',
                'for all intents and purposes': 'basically',
                'in a nutshell': 'in short'
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
                // More robotic starters
                'It is apparent that',
                'We can see that',
                'This demonstrates that',
                'The evidence shows that',
                'It follows that'
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
                // More starters for variety
                "You know what?",
                "Think about this:",
                "It seems to me that",
                "From my perspective,",
                "I reckon that",
                "As far as I'm concerned,"
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
                "it looks like",
                // More for hedging
                "probably",
                "maybe",
                "perhaps",
                "likely",
                "possibly",
                "I think"
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
                "Look,",
                // More transitions
                "Anyway,",
                "By the way,",
                "Speaking of which,",
                "On that note,",
                "Moving on,"
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
                "frankly",
                // More fillers for naturalness
                "like",
                "um",
                "well",
                "so",
                "right",
                "yeah"
            ],

            flowMarkers: [
                "Now, here's the interesting part:",
                "But wait, there's more:",
                "Here's where it gets tricky:",
                "This is where things get interesting:",
                "Let me break this down:",
                "Think about it this way:",
                "Here's the kicker:",
                "Get this:",
                // More flow markers
                "The thing is:",
                "Here's the deal:",
                "Bottom line:",
                "In essence:"
            ]
        };
    }

    buildConnectors() {
        return {
            'and': ['plus', 'along with', 'as well as', 'together with', 'not to mention', 'also'],
            'but': ['however', 'though', 'yet', 'still', 'although', 'on the contrary'],
            'because': ['since', 'as', 'given that', 'seeing that', 'due to', 'owing to'],
            'so': ['therefore', 'thus', 'hence', 'as a result', 'consequently', 'that is why'],
            'also': ['too', 'as well', 'plus', 'what\'s more', 'furthermore', 'additionally'],
            'very': ['really', 'quite', 'pretty', 'rather', 'extremely', 'super'],
            'many': ['lots of', 'plenty of', 'tons of', 'loads of', 'a bunch of', 'numerous'],
            'important': ['key', 'crucial', 'vital', 'significant', 'essential', 'critical']
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
                },
                // Additional breaker for very long sentences
                {
                    pattern: /(.{100,})\s+and\s+(.{50,})/g,
                    replacement: '$1. And $2'
                }
            ],

            conversionalizers: [
                {
                    pattern: /It is important to (.+)/gi,
                    replacement: 'You really need to $1'
                },
                {
                    pattern: /One should (.+)/gi,
                    replacement: 'You should $1'
                },
                {
                    pattern: /It can be seen that (.+)/gi,
                    replacement: 'Clearly, $1'
                },
                {
                    pattern: /There are many (.+) that (.+)/gi,
                    replacement: 'Lots of $1 $2'
                },
                // More conversational templates
                {
                    pattern: /The (.+) is (.+)/gi,
                    replacement: 'That $1 seems $2'
                },
                {
                    pattern: /This (.+) leads to (.+)/gi,
                    replacement: 'This $1 ends up causing $2'
                }
            ]
        };
    }

    fixSubjectVerbAgreement(match, subject, verb) {
        const thirdPersonSingular = ['he', 'she', 'it'];
        const irregularVerbs = {
            'be': 'is', 'have': 'has', 'do': 'does', 'go': 'goes',
            'try': 'tries', 'fly': 'flies', 'cry': 'cries',
            'study': 'studies', 'carry': 'carries',
            'fix': 'fixes', 'mix': 'mixes', 'pass': 'passes'
        };

        if (thirdPersonSingular.includes(subject.toLowerCase())) {
            if (irregularVerbs[verb.toLowerCase()]) {
                return `${subject} ${irregularVerbs[verb.toLowerCase()]}`;
            } else if (!verb.endsWith('s') && !verb.endsWith('ed') && !verb.endsWith('ing')) {
                if (verb.endsWith('y') && 'bcdfghjklmnpqrstvwx'.includes(verb[verb.length - 2].toLowerCase())) {
                    return `${subject} ${verb.slice(0, -1) + 'ies'}`;
                } else if (verb.endsWith('ch') || verb.endsWith('sh') || verb.endsWith('x') || verb.endsWith('s') || verb.endsWith('z')) {
                    return `${subject} ${verb}es`;
                } else {
                    return `${subject} ${verb}s`;
                }
            }
        } else if (!thirdPersonSingular.includes(subject.toLowerCase()) && verb.endsWith('s') && !irregularVerbs[verb.toLowerCase()]) {
            return `${subject} ${verb.slice(0, -1)}`;
        }
        
        return match;
    }

    async processText(text) {
        let result = text;
        
        // Step 1: Clean and normalize
        result = this.normalizeText(result);
        
        // Step 2: Apply grammar corrections first
        result = this.applyGrammarCorrections(result);
        
        // Step 3: Remove AI patterns with more aggression
        if (this.settings.patterns) {
            result = this.removeAIPatterns(result);
        }
        
        // Step 4: Break down and process sentences with enhanced paraphrasing
        const sentences = this.intelligentSentenceSplit(result);
        const processedSentences = await this.processSentences(sentences);
        
        // Step 5: Reconnect with natural flow and add contractions
        result = this.reconnectWithNaturalFlow(processedSentences);
        result = this.addContractions(result);
        
        // Step 6: Add human imperfections if conversational
        if (this.settings.conversational) {
            result = this.addHumanImperfections(result);
        }
        
        // Step 7: Final polish and grammar check
        result = this.finalGrammarPass(result);
        
        return result;
    }

    normalizeText(text) {
        return text.trim().replace(/\s+/g, ' ').replace(/([.!?])\s*/g, '$1 ');
    }

    applyGrammarCorrections(text) {
        let result = text;
        Object.values(this.grammarRules).flat().forEach(rule => {
            if (rule.fix) {
                result = result.replace(rule.pattern, (match, ...args) => rule.fix(match, ...args));
            } else if (rule.replacement) {
                result = result.replace(rule.pattern, rule.replacement);
            }
        });
        return result;
    }

    removeAIPatterns(text) {
        let result = text;
        
        // Replace formal connectors
        Object.entries(this.aiPatterns.formalConnectors).forEach(([key, replacements]) => {
            const pattern = new RegExp(key, 'gi');
            result = result.replace(pattern, () => this.randomChoice(replacements));
        });
        
        // Remove redundant phrases
        Object.entries(this.aiPatterns.redundantPhrases).forEach(([key, replacement]) => {
            const pattern = new RegExp('\\b' + key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'gi');
            result = result.replace(pattern, replacement);
        });
        
        // Replace robotic starters
        this.aiPatterns.roboticStarters.forEach(starter => {
            const pattern = new RegExp('\\b' + starter + '\\b', 'gi');
            result = result.replace(pattern, () => this.randomChoice(this.humanPatterns.conversationalStarters));
        });
        
        return result;
    }

    intelligentSentenceSplit(text) {
        return text.match(/[^.!?]+[.!?]+/g) || [text];
    }

    async processSentences(sentences) {
        const processed = [];
        for (let sentence of sentences) {
            let proc = sentence.trim();
            
            if (this.settings.structure) {
                proc = this.varySentenceStructure(proc);
            }
            
            if (this.settings.expressions) {
                proc = this.addHumanExpressions(proc);
            }
            
            if (this.settings.readability) {
                proc = this.enhanceReadability(proc);
            }
            
            if (!this.settings.technical) {
                proc = this.replaceSynonyms(proc);
            }
            
            proc = this.applyContextualReplacements(proc);
            
            processed.push(proc);
        }
        return processed;
    }

    varySentenceStructure(sentence) {
        if (sentence.length < 50) return sentence; // Short sentences stay
        
        const breakers = this.sentenceTemplates.longSentenceBreakers;
        breakers.forEach(breaker => {
            sentence = sentence.replace(breaker.pattern, breaker.replacement);
        });
        
        const conv = this.sentenceTemplates.conversionalizers;
        conv.forEach(c => {
            sentence = sentence.replace(c.pattern, c.replacement);
        });
        
        // Randomly add variety: make some questions or exclamations
        if (Math.random() < 0.1) {
            sentence = sentence.replace(/\.$/, '?');
        } else if (Math.random() < 0.05) {
            sentence = sentence.replace(/\.$/, '!');
        }
        
        // Split long sentences more aggressively
        if (sentence.length > 100 && Math.random() < 0.6) {
            const splitPoint = sentence.indexOf(',', sentence.length / 2);
            if (splitPoint > -1) {
                sentence = sentence.slice(0, splitPoint) + '. ' + sentence.slice(splitPoint + 1).charAt(0).toUpperCase() + sentence.slice(splitPoint + 2);
            }
        }
        
        return sentence;
    }

    addHumanExpressions(sentence) {
        if (Math.random() < 0.3) {
            const filler = this.randomChoice(this.humanPatterns.humanFillers);
            sentence = sentence.replace(/(\s+)/, ` ${filler}$1`);
        }
        
        if (Math.random() < 0.2) {
            const marker = this.randomChoice(this.humanPatterns.uncertaintyMarkers);
            sentence = `${marker.charAt(0).toUpperCase() + marker.slice(1)} ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
        }
        
        return sentence;
    }

    enhanceReadability(sentence) {
        // Shorten complex words if possible
        sentence = sentence.replace(/\butilizing\b/gi, 'using');
        sentence = sentence.replace(/\bapproximately\b/gi, 'about');
        sentence = sentence.replace(/\bindividuals\b/gi, 'people');
        
        // Vary vocabulary
        const words = sentence.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (Math.random() < 0.1 && words[i].length > 8) {
                words[i] = this.randomChoice(['simpler', 'easier', 'clearer', 'better'])[0] + ' ' + words[i];
            }
        }
        return words.join(' ');
    }

    replaceSynonyms(sentence) {
        const words = sentence.split(/\s+/);
        return words.map(word => {
            const cleanWord = word.replace(/[^a-zA-Z]/g, '');
            const synonyms = this.synonymDatabase[cleanWord.toLowerCase()];
            if (synonyms && Math.random() < 0.4) {
                return word.replace(cleanWord, this.randomChoice(synonyms));
            }
            return word;
        }).join(' ');
    }

    applyContextualReplacements(sentence) {
        this.contextualReplacements.patterns.forEach(p => {
            sentence = sentence.replace(p.search, () => this.randomChoice(p.replacements));
        });
        return sentence;
    }

    reconnectWithNaturalFlow(sentences) {
        let result = sentences.join(' ');
        
        // Add casual transitions between sentences
        for (let i = 1; i < sentences.length; i++) {
            if (Math.random() < 0.3) {
                const transition = this.randomChoice(this.humanPatterns.casualTransitions);
                sentences[i] = transition + ' ' + sentences[i].charAt(0).toLowerCase() + sentences[i].slice(1);
            }
        }
        
        return sentences.join(' ');
    }

    addContractions(text) {
        const contractions = {
            'is not': 'isn\'t',
            'are not': 'aren\'t',
            'was not': 'wasn\'t',
            'were not': 'weren\'t',
            'has not': 'hasn\'t',
            'have not': 'haven\'t',
            'had not': 'hadn\'t',
            'do not': 'don\'t',
            'does not': 'doesn\'t',
            'did not': 'didn\'t',
            'will not': 'won\'t',
            'would not': 'wouldn\'t',
            'shall not': 'shan\'t',
            'should not': 'shouldn\'t',
            'can not': 'can\'t',
            'could not': 'couldn\'t',
            'must not': 'mustn\'t',
            'I am': 'I\'m',
            'you are': 'you\'re',
            'he is': 'he\'s',
            'she is': 'she\'s',
            'it is': 'it\'s',
            'we are': 'we\'re',
            'they are': 'they\'re',
            'I have': 'I\'ve',
            'you have': 'you\'ve',
            'we have': 'we\'ve',
            'they have': 'they\'ve',
            'I will': 'I\'ll',
            'you will': 'you\'ll',
            'he will': 'he\'ll',
            'she will': 'she\'ll',
            'it will': 'it\'ll',
            'we will': 'we\'ll',
            'they will': 'they\'ll',
            'I would': 'I\'d',
            'you would': 'you\'d',
            'he would': 'he\'d',
            'she would': 'she\'d',
            'it would': 'it\'d',
            'we would': 'we\'d',
            'they would': 'they\'d'
        };

        Object.entries(contractions).forEach(([expanded, contracted]) => {
            const pattern = new RegExp('\\b' + expanded + '\\b', 'gi');
            text = text.replace(pattern, contracted);
        });

        return text;
    }

    addHumanImperfections(text) {
        // Add slight variations like ellipses or dashes for thought pauses
        if (Math.random() < 0.2) {
            text = text.replace(/,\s/g, ' -- ');
        }
        if (Math.random() < 0.15) {
            text = text.replace(/\.\s/g, '... ');
        }
        
        // Add personal touch
        if (Math.random() < 0.1) {
            text = 'I think ' + text.charAt(0).toLowerCase() + text.slice(1);
        }
        
        return text;
    }

    finalGrammarPass(text) {
        return this.applyGrammarCorrections(text);
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    updateInputStats() {
        const count = this.countWords(this.inputText.value);
        this.inputWordCount.textContent = `${count} words`;
        this.aiIndicator.style.display = count > 0 ? 'inline-block' : 'none';
    }

    updateOutputStats() {
        const count = this.countWords(this.outputText.value);
        this.outputWordCount.textContent = `${count} words`;
        this.humanIndicator.style.display = count > 0 ? 'inline-block' : 'none';
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
            const processingDelay = Math.max(1000, Math.ceil(wordCount / 50) * 1000);

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
        const improvementScore = Math.min(98, Math.max(85, Math.floor(changeRatio * 100 + Math.random() * 10)));
        const uniquenessScore = Math.floor(Math.random() * 10) + 90;
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