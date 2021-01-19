import {getAllPostIds, getPostData} from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/Date'

export default function Post({postData}) {
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1>{postData.title}</h1>
				<div>
					<Date dateString={postData.date}/>
				</div>
				<div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
			</article>
		</>
	)
}

export async function getStaticPaths() {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({params}) {
	const postData = await getPostData(params.id)
	return {
		props: {
			postData
		}
	}
}
