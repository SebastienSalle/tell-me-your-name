import capitalize from "./capitalizingWord";

test('Should work with anyStrIng', () => {
    const name = 'anyString'
    expect(capitalize(name)).toBe('Anystring')
})

test('Should work with jean-pierre', () => {
    const name = 'jean-pierre'
    expect(capitalize(name)).toBe('Jean-Pierre')
})

test('Should work with any - string', () => {
    const name = 'any - string'
    expect(capitalize(name)).toBe('Any-String')
})

test('Should work with  a n y S t r i n g ', () => {
    const name = ' a n y S t r i n g '
    expect(capitalize(name)).toBe('Anystring')
})

test('Should work with j e a   n - M i   c h e l', () => {
    const name = 'j e a   n - M i   c h e l'
    expect(capitalize(name)).toBe('Jean-Michel')
})