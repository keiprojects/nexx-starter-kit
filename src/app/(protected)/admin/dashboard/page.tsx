import { redirect } from "next/navigation";

import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/lib/roles";
import { SearchUsers } from "./_components/search-users";
import { setRole } from "./actions/setRole";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default async function AdminDashboard(params: {
	searchParams: { search?: string };
}) {
	if (!checkRole("ADMIN")) {
		redirect("/");
	}

	const query = params.searchParams.search;

	const users = query
		? (await clerkClient().users.getUserList({ query })).data
		: [];

	return (
		<>
			<h1>This is the admin dashboard</h1>
			<p>This page is restricted to users with the 'admin' role.</p>
			<SignedIn>
				<UserButton />
			</SignedIn>

			<SearchUsers />

			{users.map((user) => {
				return (
					<div key={user.id}>
						<div>
							{user.firstName} {user.lastName}
						</div>
						<div>
							{
								user.emailAddresses.find(
									(email) => email.id === user.primaryEmailAddressId
								)?.emailAddress
							}
						</div>
						<div>{user.publicMetadata.role as string}</div>
						<div>
							<form action={setRole}>
								<input type='hidden' value={user.id} name='id' />
								<input type='hidden' value='admin' name='role' />
								<button type='submit'>Make Admin</button>
							</form>
						</div>
						<div>
							<form action={setRole}>
								<input type='hidden' value={user.id} name='id' />
								<input type='hidden' value='moderator' name='role' />
								<button type='submit'>Make Moderator</button>
							</form>
						</div>
					</div>
				);
			})}
		</>
	);
}
