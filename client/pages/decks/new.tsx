import Head from 'next/head'
import DeckForm from "../../components/forms/deck/DeckForm";
import {useCreateDeck} from "../../apollo/actions";
import {useState} from "react";
import useToast from "../../hooks/useToast";
import {useRouter} from "next/router";

export default function NewDeck() {
	const [createDeck] = useCreateDeck();
	const [loading, setLoading] = useState<boolean>(false);
	const showToast = useToast();
	const router = useRouter();

	const handleCreateDeck = async (val) => {
		setLoading(true);

		try {
			const {data} = await createDeck({variables: val});

			showToast({
				severity: "success",
				message: `DECK_CREATED_SUCCESSFULLY ${data.createDeck.title}`,
			})
			await router.push(`${data.createDeck._id}`);
		} catch (e) {
			setLoading(false);
			showToast({
				severity: "error",
				message: e.message,
			})
		}
	}

	return (
		<>
			<Head>
				<title>Create new deck</title>
			</Head>
			<section>
				<h2>Create new deck</h2>
				<DeckForm onSubmit={handleCreateDeck} loading={loading} />
			</section>
		</>
	)
}
