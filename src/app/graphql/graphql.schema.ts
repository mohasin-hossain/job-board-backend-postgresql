export const typeDefs = `#graphql
  type Job {
    id: ID!
    title: String!
    description: String!
    company: String!
    location: String!
    created_at: String!
    applications: [Application!]!
  }

  type Application {
    id: ID!
    job_id: Int!
    applicant_name: String!
    applicant_email: String!
    cover_letter: String!
    submitted_at: String!
  }

  input JobInput {
    title: String!
    description: String!
    company: String!
    location: String!
  }

  input ApplicationInput {
    job_id: Int!
    applicant_name: String!
    applicant_email: String!
    cover_letter: String!
  }

  type Query {
    jobs: [Job!]!
    job(id: ID!): Job
    applications(job_id: ID!): [Application!]!
  }

  type Mutation {
    createJob(input: JobInput!): Job!
    createApplication(input: ApplicationInput!): Application!
  }
`;