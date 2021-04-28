import { Button } from 'react-bootstrap'

export function CreateButton({ children }) {
    return (
        <Button variant="success">{children}</Button>
    )
}

export function EditButton({ children }) {
    return (
        <Button variant="outline-primary" size="sm">{children}</Button>
    )
}

export function BackButton({ children }) {
    return (
        <Button variant="primary" size="sm">{children}</Button>
    )
}