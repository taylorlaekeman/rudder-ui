import { gql } from '@apollo/client';
import type {
  ApolloCache,
  FetchResult,
  MutationHookOptions,
} from '@apollo/client';

import type { Sprint } from 'types';

export const cacheUpdates: Record<string, MutationHookOptions> = {
  saveNewSprint: {
    update(cache: ApolloCache<Sprint>, { data }: FetchResult): void {
      cache.modify({
        fields: {
          sprints(existingSprints = []) {
            const newSprint = cache.writeFragment({
              data: data?.['createSprint'],
              fragment: gql`
                fragment NewSprint on Sprint {
                  id
                  endDate
                }
              `,
            });
            return [...existingSprints, newSprint];
          },
        },
      });
    },
  },
};

export const mutations = {
  addGoal: gql`
    mutation AddGoal($sprint: ID!, $text: String!) {
      createGoal(input: { sprintId: $sprint, text: $text }) {
        id
        endDate
        goals {
          id
          text
          isAchieved
        }
      }
    }
  `,
  createSprint: gql`
    mutation CreateSprint($endDate: String) {
      createSprint(input: { endDate: $endDate }) {
        id
        endDate
        goals {
          id
          text
          isAchieved
        }
      }
    }
  `,
  updateGoal: gql`
    mutation UpdateGoal(
      $sprint: ID!
      $goal: ID!
      $text: String
      $isAchieved: Boolean
    ) {
      updateGoal(
        input: {
          sprintId: $sprint
          goalId: $goal
          text: $text
          isAchieved: $isAchieved
        }
      ) {
        id
        endDate
        goals {
          id
          text
          isAchieved
        }
      }
    }
  `,
};

export const queries = {
  getSprint: gql`
    query getSprint($id: ID!) {
      sprint(id: $id) {
        id
        endDate
        goals {
          id
          isAchieved
          text
        }
      }
    }
  `,
  getSprints: gql`
    {
      sprints {
        id
        endDate
        goals {
          id
          isAchieved
          text
        }
      }
    }
  `,
};
