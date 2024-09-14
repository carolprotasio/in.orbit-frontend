import { useMutation, useQueryClient } from '@tanstack/react-query'

export async function deleteGoalCompletion(completedId: string) {
  await fetch(`http://localhost:3333/deleteCompletions/${completedId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completedId,
    }),
  })
}

export function useDeleteGoalCompletion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteGoalCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    },
    onError: error => {
      console.error('Failed to delete the goal: ', error)
    },
  })
}
