import {createTRPCRouter, privateProcedure} from "~/server/api/trpc";
import {db} from "~/server/db";

export const authRouter = createTRPCRouter({
    getProfile: privateProcedure.query(({ctx}) => {

        return db.profiles.findFirstOrThrow({
            where: {
                id: ctx.user.id,
            },
        });
    }),
});
