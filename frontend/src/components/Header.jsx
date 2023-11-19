/* eslint-disable react/prop-types */
export default function Header({ children }) {
    return (
        <>
            <header className='flex w-full h-auto items-center justify-between'>
                {children}
            </header>
        </>
    )
}

export function LeftContent({ children, customClass }) {
    return (
        <>
            <div className={`${customClass}`}>{children}</div>
        </>
    )
}

export function RightContent({ children, customClass }) {
    return (
        <>
            <div className={`${customClass}`}>{children}</div>
        </>
    )
}

Header.LeftContent = LeftContent
Header.RightContent = RightContent
