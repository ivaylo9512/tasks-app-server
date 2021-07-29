import { InputType, Field } from "type-graphql"

@InputType()
export default class UpdateInput {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    state: string

    @Field({ nullable: true })
    from?: string

    @Field({ nullable: true })
    to?: string

    @Field({ nullable: true })
    alertAt?: string

    @Field({ nullable: true })
    eventDate?: string
}