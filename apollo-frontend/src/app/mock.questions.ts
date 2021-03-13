import { Question, Saved } from "./db.service";

export const mock_questions: Saved<Question>[] = [
    {
        id: '1',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/slon.jpg' ],
            question: 'Защо бройката на слоновете в Африка намалява?',
            answer: {
                choises: [
                    'Убиван е от други животни',
                    'Липса на храна',
                    'Убивани са от бракониери',
                    'Замърсяване на въздуха'
                ],
                correctChoise: 'Убивани са от бракониери',
            }
        }
    },
    {
        id: '2',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/carski orel.jpg' ],
            question: 'Каква е главната причина за намаляването на бройките Царски орли?',
            answer: {
                choises: [
                    'Бракониери',
                    'Замърсяване',
                    'Отсичане на горите',
                    'Електрически стълбове'
                ],
                correctChoise: 'Електрически стълбове',
            }
        }
    },
    {
        id: '3',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/zlatna zhaba.png' ],
            question: 'Каква е причината за изчезването на Златната жаба?',
            answer: {
                choises: [
                    'Глобално затопляне',
                    'Замърсяване на реките',
                    'Отсичане на горите',
                    'Недостиг на храна'
                ],
                correctChoise: 'Глобално затопляне',
            }
        }
    },
    {
        id: '4',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/shtigga.jpg' ],
            question: 'Каква е причината за намаляването на бройките на Черният щъркел?',
            answer: {
                choises: [
                    'Замърсяването на блатата и езерата',
                    'Недостиг на храна',
                    'Глобално затопляне',
                    'Естествени врагове',
                ],
                correctChoise: 'Замърсяването на блатата и езерата',
            }
        }
    },
    {
        id: '5',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/tulen.jpg' ],
            question: 'Вярно или грешно. От 1996г. тюлените в Черно море намаляват, като днес те са почти изчезнали у нас.',
            answer: {
                choises: [
                    'Вярно',
                    'Грешно',
                ],
                correctChoise: 'Грешно',
            }
        }
    },
    {
        id: '6',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/ris.jpg' ],
            question: 'Каква е причината за намаляването на бройките рисове в България?',
            answer: {
                choises: [
                    'Глобално затопляне',
                    'Незаконно избиване за козината им',
                    'Разрушаването на местообитанията им',
                    'Убиван е от естествени врагове',
                ],
                correctChoise: 'Незаконно избиване за козината им',
            }
        }
    },
    {
        id: '7',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/nosorog.png' ],
            question: 'Вярно или грешно. Африканският черен носорог е изчезнал заради Глобалното затопляне.',
            answer: {
                choises: [
                    'Вярно',
                    'Грешно',
                ],
                correctChoise: 'Грешно',
            }
        }
    },
    {
        id: '8',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/kozirog.jpg' ],
            question: 'Вярно или невярно. През 2009г. е клониран Пиринейският козирог,който е изчезнал през 2000г.',
            answer: {
                choises: [
                    'Вярно',
                    'Грешно',
                ],
                correctChoise: 'Вярно',
            }
        }
    },
    {
        id: '9',
        el: {
            category: 'animals',
            photoUrlsAbove: [ '/assets/images/questions/ara.jpg' ],
            question: 'Посочете невярното твърдение. Спиксовия ара е изчезнал поради:',
            answer: {
                choises: [
                    'Унищожаването на местообитанията им',
                    'Незаконният лов',
                    'Незаконната търговия',
                    'Глобално затопляне',
                ],
                correctChoise: 'Глобално затопляне',
            }
        }
    },
    {
        id: '10',
        el: {
            category: 'recycling',
            photoUrlsAbove: [ '/assets/images/questions/teniski.png' ],
            question: 'Колко литра вода отнема да се направи една тениска?',
            answer: {
                choises: [
                    '26л.',
                    '260л.',
                    '1000л.',
                    '2600л.',
                ],
                correctChoise: '2600л.',
            }
        }
    },
    {
        id: '11',
        el: {
            category: 'recycling',
            photoUrlsAbove: [ '/assets/images/questions/dunki.png' ],
            question: 'Колко горе долу литра вода отнема да се направят един чифт дънки?',
            answer: {
                choises: [
                    '1000л.',
                    '200л.',
                    '5000л.',
                    '7000л.',
                ],
                correctChoise: '7000л.',
            }
        }
    },
    {
        id: '12',
        el: {
            category: 'recycling',
            photoUrlsAbove: [ '/assets/images/questions/bonishte.png' ],
            question: 'Колко процента от нещата, заровени в сметищета,могат да бъдат рециклирани.',
            answer: {
                choises: [
                    '20',
                    '30',
                    '50',
                    '80',
                    '90',
                    '0',
                ],
                correctChoise: '80',
            }
        }
    },
    {
        id: '13',
        el: {
            category: 'recycling',
            photoUrlsAbove: [ '/assets/images/questions/kapeshto kranche.png' ],
            question: 'Колко литра вода губи едно капещо кранче за ден?',
            answer: {
                choises: [
                    '1',
                    '5',
                    '10',
                    '50',
                    '100',
                    '120',
                ],
                correctChoise: '120',
            }
        }
    },
    {
        id: '14',
        el: {
            category: 'recycling',
            photoUrlsAbove: [ '/assets/images/questions/roklq.png' ],
            question: 'За около колко години се разгражда една рокля от полиестер?',
            answer: {
                choises: [
                    '50',
                    '100',
                    '200',
                    '150',
                    'Над 200',
                ],
                correctChoise: '200',
            }
        }
    },
    {
        id: '15',
        el: {
            category: 'recycling',
            photoUrlsAbove: [ '/assets/images/questions/sudomiqlnq.png' ],
            question: 'Вярно или грешно. Миенето на чинии ръчно хаби почти толкова вода, колкото със съдомиялна машина.',
            answer: {
                choises: [
                    'Вярно',
                    'Грешно',
                ],
                correctChoise: 'Грешно',
            }
        }
    },
];
