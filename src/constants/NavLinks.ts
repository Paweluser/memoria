import { BarChart2, BookOpen, FileText, Home, Settings, Truck, User, UsersRound } from "lucide-react"

export const NavLinks = [
    {
        title: 'Dashboard',
        links: [{ label: 'Panel główny', href: '/dashboard', icon: Home }],
    },
    {
        title: 'Ceremonia',
        links: [
            {
                label: 'Pogrzeby',
                href: '/dashboard/funerals',
                icon: BookOpen,
            },
            { label: 'Przewozy', href: '/dashboard/transports', icon: Truck },
        ],
    },
    {
        title: 'Personel',
        links: [
            { label: 'Pracownicy', href: '/dashboard/employees', icon: User },
            { label: 'Zespoły', href: '/dashboard/teams', icon: UsersRound },
        ],
    },
    {
        title: 'Analityka',
        links: [
            {
                label: 'Statystyki',
                href: '/dashboard/statistics',
                icon: BarChart2,
            },
        ],
    },
    {
        title: 'Finanse',
        links: [
            { label: 'Faktury', href: '/dashboard/invoices', icon: FileText },
        ],
    },
    {
        title: 'Inne',
        links: [
            { label: 'Ustawienia', href: '/dashboard/settings', icon: Settings },
        ],
    },
]