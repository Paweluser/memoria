import { BarChart2, BookOpen, Briefcase, FileText, Home, PlusCircle, Settings, Users, UsersRound } from "lucide-react"

export const NavLinks = [
    {
        title: 'Dashboard',
        links: [{ label: 'Panel główny', href: '/dashboard', icon: Home }],
    },
    {
        title: 'Ceremonia',
        links: [
            {
                label: 'Dodaj pogrzeb',
                href: '/dashboard/funerals/new',
                icon: PlusCircle,
            },
            { label: 'Dodaj przewóz', href: '/dashboard/transports', icon: Briefcase },
            {
                label: 'Historia',
                href: '/dashboard/funerals/history',
                icon: BookOpen,
            },
        ],
    },
    {
        title: 'Personel',
        links: [
            { label: 'Pracownicy', href: '/dashboard/employees', icon: Users },
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