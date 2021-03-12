import { Injectable } from '@angular/core';

export interface Minigame {
    name: string;
    url: string;
    comingSoon?: boolean;
}

export interface CardParagraph {
    heading: string;
    content: string;
}
export interface Card {
    info: CardParagraph[];
    imageUrl: string;
    name: string;
    types: Array<"endangered" | "normal">;
}
export interface Saved<T> {
    id: string;
    el: T;
}

@Injectable({
    providedIn: 'root'
})
export class DbService {
    private mock_minigames: Saved<Minigame>[] = [
        {
            id: '0',
            el: {
                name: 'Рециклиране',
                url: '/minigames/conveyor-belt',
            }
        },
        {
            id: '0',
            el: {
                name: 'BioTrivia',
                url: '/minigames/biotrivia',
            }
        }
    ];
    private mock_card_types: Saved<Card>[] = [
        {
            id: '0',
            el: {
                name: 'Пингвин',
                types: ['normal'],
                imageUrl: '/assets/images/cards/pingvin.jpg',
                info: [
                    {
                        content: 'Тъй като нямат естествен враг на сушата, пингвините не показват страх, а любопитство когато към тях се приближи човек.',
                        heading: 'Интересно'
                    }
                ]
            }
        },
        {
            id: '1',
            el: {
                name: 'Пингвин',
                types: ['normal'],
                imageUrl: '/assets/images/cards/pingvin2.jpg',
                info: [
                    {
                        content: 'Пингвините мътят яйцата си на смени. Когато мъжкият отиде да яде, той не може да намери пътя обратно към гнездото и започва да крещи шумно. Женските разпознават гласовете на партньорите си сред хиляди други и крещят в отговор, така че те да знаят къде да се върнат.',
                        heading: 'Интересно'
                    }
                ]
            }
        },
        {
            id: '2',
            el: {
                name: 'Делфин',
                types: ['normal'],
                imageUrl: '/assets/images/cards/delfin.jpg',
                info: [
                    {
                        content: 'Делфините общуват по между си с помощта на звуци, като всеки звук може да изразява различно настроение.',
                        heading: 'Интересно'
                    }
                ]
            }
        },
        {
            id: '3',
            el: {
                name: 'Делфин',
                types: ['normal'],
                imageUrl: '/assets/images/cards/delfin2.jpg',
                info: [
                    {
                        content: 'Делфините никога не заспиват напълно. Докато си почиват, едната половина на мозъка им продължава да бъде активна. Ето защо дори и по време на сън едното им око остава отворено.',
                        heading: 'Интересно'
                    }
                ]
            },
        },
        {
            id: '4',
            el: {
                name: 'Син кит',
                types: ['normal'],
                imageUrl: '/assets/images/cards/sinkit.jpg',
                info: [
                    {
                        content: 'Освен най-едрото, синият кит е и най-шумното животно – звукът, който издава е от порядъка на 188 децибела и може да бъде чут на разстояние до 800 км. За сравнение, звукът на пътнически самолет е „едва” 120 децибела.',
                        heading: 'Интересно'
                    }
                ]
            }
        },
        {
            id: '5',
            el: {
                name: 'Син кит',
                types: ['normal'],
                imageUrl: '/assets/images/cards/sinkit2.jpg',
                info: [
                    {
                        content: 'Езикът на кита тежи около 4,7 тона. (почти колкото митко и майка му)',
                        heading: 'Интересно'
                    }
                ]
            }
        },
        {
            id: '6',
            el: {
                name: 'Пор',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/por.jpg',
                info: [
                    {
                        heading: 'Морфология на "пор"',
                        content: 'Думата "пор" произлиза от латински и означава "крадец".',
                    },
                    {
                        heading: 'Застрашен вид',
                        content: 'Загубата на местообитания и бракониерството, са причина днес те или техните следи да се наблюдават изключително рядко.',
                    },
                ],
            },
        },
        {
            id: '7',
            el: {
                name: 'Кафява мечка',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/kafqva-mechka.jpg',
                info: [
                    {
                        heading: 'Сладки сънища',
                        content: 'Учените вярват, че мечките могат да сънуват.',
                    },
                    {
                        heading: 'Fast as f',
                        content: 'Макар да изглеждат тромави,мечките могат да тичат с до 60 км/ч.',
                    },
                    {
                        heading: 'Застрашен вид',
                        content: 'За съжаление хората им нанасят непоправими щети, като разкъсват с пътища и огради ареала им, унищожават горите и ги избиват.',
                    },
                ],
            },
        },
        {
            id: '8',
            el: {
                name: 'Балканска дива коза',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/koza.jpg',
                info: [
                    {
                        heading: 'Властелина на пръстените',
                        content: 'Знаехте ли, че всяка година се прибавя по още един пръстен върху рогата на дивата коза, като така може да се определи възрастта на даденото животно.',
                    },
                    {
                        heading: 'И ся почваме да бегами',
                        content: 'На света няма друго животно, което да притежава по-голяма ловкост и бързина на придвижване по хлъзгави и стръмни терени.',
                    },
                ],
            },
        },
        {
            id: '9',
            el: {
                name: 'Прилеп',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/prilep.jpg',
                info: [
                    {
                        heading: 'Напаст пещерна',
                        content: 'най-голямата колония от прилепи в света наброява над 20 милиона броя от тези летящи създания.',
                    },
                    {
                        heading: 'Ехо .... (ехо)',
                        content: 'Прилепите използват ехолокация, за да се заобиколят в тъмното.',
                    },
                    {
                        heading: 'Защитен вид',
                        content: 'Според българското законодателство, прилепите са защитени видове.',
                    },
                ],
            },
        },
        {
            id: '10',
            el: {
                name: 'Лалугер',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/laluger.jpg',
                info: [
                    {
                        heading: 'Втори братовчед на ленивеца',
                        content: 'Когато е студено, той заспива зимен сън и се събужда едва през пролетта.',
                    },
                    {
                        heading: 'Мали ша са напикая',
                        content: 'Когато е изплашен, той застава на задните си лапи.',
                    },
                    {
                        heading: 'Защитен вид',
                        content: 'Интензивно селско стопанство и използване на пестициди причиняват бързото изчезване на този вид.',
                    },
                ],
            },
        },
        {
            id: '11',
            el: {
                name: 'Етруската земеровка',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/zemerovka.jpg',
                info: [
                    {
                        heading: 'Размер',
                        content: 'Един от най-дребните бозайници на планетата с размери едва 3,6 до 5,2 см и тегло от 1,25 до 2,34 грама!',
                    },
                    {
                        heading: 'Лакомници',
                        content: 'Етруската земеровка трява да яде непрекъснато за да може да живее.',
                    },
                ],
            },
        },
        {
            id: '12',
            el: {
                name: 'Тюленът монах',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/tuleni.jpg',
                info: [
                    {
                        heading: 'Техния живот',
                        content: 'Те се крият в подводни пещери, където си почиват и раждат своите малки.',
                    },
                ],
            },
        },
        {
            id: '13',
            el: {
                name: 'Видра',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/vidra.jpg',
                info: [
                    {
                        heading: 'Мали колко сладко',
                        content: 'Морските видри се държат за ръце  докато спят, за да не бъдат разделени от теченията докато се носят по водната повърхност.',
                    },
                    {
                        heading: 'NO MERCY',
                        content: 'В момент на опасност видрите показват бебетата си на хищниците, за да предизвикат съчувствие и по този начин да избегнат атаката.',
                    },
                ],
            },
        },
        {
            id: '14',
            el: {
                name: 'Ловен сокол',
                types: ['endangered'],
                imageUrl: '/assets/images/cards/sokol.jpg',
                info: [
                    {
                        heading: 'Ловни навици',
                        content: 'Те не ловуват близо до гнездата си, а се опитват да летят доколкото е възможно.',
                    },
                    {
                        heading: 'Застрашен вид',
                        content: 'Има опасност от изчезване. Основната причина, поради която населението на ловния сокол намалява, е човешката дейност.',
                    },
                ],
            },
        },
    ];

    private getRandomEl<T>(array: T[]): T {
        const index = Math.floor(Math.random() * array.length);

        return array[index];
    }

    getAllMinigames(): Saved<Minigame>[] {
        return this.mock_minigames;
    }
    getAllCards(): Saved<Card>[] {
        return this.mock_card_types;
    }

    getMinigame(id: string): Minigame {
        const index = this.mock_minigames.findIndex(v => v.id === id);

        if (index < 0) return null;
        else return this.mock_minigames[index].el;
    }
    getCard(id: string): Card {
        const index = this.mock_card_types.findIndex(v => v.id === id);

        if (index < 0) return null;
        else return this.mock_card_types[index].el;
    }

    constructor() { }
}
