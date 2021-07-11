import { InputType, Field } from "type-graphql"

@InputType()
export class TaskInput {
    @Field()
    id?: number
    @Field()
    from: Date
    @Field()
    to: Date
    @Field()
    daily: boolean
    @Field()
    alertAt: Date
}