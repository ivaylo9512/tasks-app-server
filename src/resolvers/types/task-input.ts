import { InputType, Field } from "type-graphql"

@InputType()
export class TaskInput {
    @Field({ nullable: true })
    id?: number
    @Field({ nullable: true })
    from?: string
    @Field({ nullable: true })
    to?: string
    @Field()
    state!: string
    @Field({ nullable: true })
    alertAt?: Date
    @Field()
    name!: string
    @Field({ nullable: true })
    eventDate?: string
}