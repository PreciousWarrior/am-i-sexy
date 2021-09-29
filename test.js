const amISexy = require('./index');
let client;

beforeAll(async () => {
	client = await amISexy.build();
});

test('Samuel Miller should be sexy', async () => {
	expect(await client.amISexy('Samuel Miller')).toBe(true);
	expect(await client.amISexy('Samuel')).toBe(true);
	expect(await client.amISexy('SaMUEL')).toBe(true);
});

test('Things that are not samuel miller should not be sexy.', async () => {
	expect(await client.amISexy('Car')).toBe(false);
});
