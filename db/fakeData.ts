const fakeData = {
	portfolio: () => {
		const getRandomBoolean = () => Math.random() < 0.5;
		return [
			{
				_id: "sad87da79",
				title: getRandomBoolean() ? 'Job in Netcentric' : 'Job in Amazon',
				company: getRandomBoolean() ? 'Netcentric' : 'Amazon',
				companyWebsite: 'www.google.com',
				location: 'Spain, Barcelona',
				jobTitle: 'Engineer',
				description: 'Doing something, programing....',
				startDate: '01/01/2014',
				endDate: '01/01/2016'
			},
			{
				_id: "da789ad1",
				title: getRandomBoolean() ? 'Job in Siemens' : 'Job in Google',
				company: getRandomBoolean() ? 'Siemens' : 'Google',
				companyWebsite: 'www.google.com',
				location: 'Slovakia, Kosice',
				jobTitle: 'Software Engineer',
				description: 'Responsoble for parsing framework for JSON medical data.',
				startDate: '01/01/2011',
				endDate: '01/01/2013'
			},
			{
				_id: "sadcxv9",
				title: getRandomBoolean() ? 'Work in USA' : 'Work in Poland',
				company: 'WhoKnows',
				companyWebsite: 'www.google.com',
				location: 'USA, Montana',
				jobTitle: 'Housekeeping',
				description: 'So much responsibility....Overloaaaaaad',
				startDate: '01/01/2010',
				endDate: '01/01/2011'
			}
		];
	}
}

export default fakeData;
