import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Todo from './Todo'

describe('Todo', () => {
  test('renders an unfinished todo and calls completeTodo', async () => {
    const todo = {
      _id: 'todo-1',
      text: 'Write a component test',
      done: false,
    }
    const deleteTodo = vi.fn()
    const completeTodo = vi.fn()
    const user = userEvent.setup()

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

    expect(screen.getByText('Write a component test')).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()

    await user.click(screen.getByText('Set as done'))

    expect(completeTodo).toHaveBeenCalledWith(todo)
    expect(deleteTodo).not.toHaveBeenCalled()
  })

  test('renders a completed todo and calls deleteTodo', async () => {
    const todo = {
      _id: 'todo-2',
      text: 'Ship the Docker build',
      done: true,
    }
    const deleteTodo = vi.fn()
    const completeTodo = vi.fn()
    const user = userEvent.setup()

    render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

    expect(screen.getByText('Ship the Docker build')).toBeInTheDocument()
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.queryByText('Set as done')).not.toBeInTheDocument()

    await user.click(screen.getByText('Delete'))

    expect(deleteTodo).toHaveBeenCalledWith(todo)
    expect(completeTodo).not.toHaveBeenCalled()
  })
})
