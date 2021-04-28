import { Button } from 'react-bootstrap'

export function CreateButton({ children }) {
    return (
        <Button variant="info">{children}</Button>
    )
}

export function EditButton({ children }) {
    return (
        <Button variant="outline-warning" size="sm">{children}</Button>
    )
}

export function PlayButton({ children }) {
    return (
        <Button variant="outline-primary" size="sm">{children}</Button>
    )
}

export function BackButton({ children }) {
    return (
        <Button className='back-btn' variant="outline-primary" size="sm">{children}</Button>
    )
}

export function TopButton({ children }) {
    return (
        <Button className='back-btn' variant="outline-success" size="sm">{children}</Button>
    )
}

export function UpdateButton({ children }) {
    return (
        <Button variant="warning">{children}</Button>
    )
}

export function DeleteButton({ children }) {
    return (
        <Button variant="danger">{children}</Button>
    )
}