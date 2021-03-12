import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter', [
                style({ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%' })
            ], { optional: true }),
            query(':leave', [
                style({ opacity: 1 })
            ], { optional: true }),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ opacity: 0 }))
                ], { optional: true }),
                query(':enter', [
                    animate('300ms ease-out', style({ opacity: 1 }))
                ], { optional: true })
            ]),
            query(':enter', animateChild(), { optional: true }),
        ]),
    ]);
