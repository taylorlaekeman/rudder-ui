import { gql } from '@apollo/client';

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
};

export const queries = {
  getSprint: gql`
    query getSprint($id: ID!) {
      sprint(id: $id) {
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
  getSprints: gql`
    {
      sprints {
        id
        endDate
        goals {
          id
          text
        }
      }
    }
  `,
};
