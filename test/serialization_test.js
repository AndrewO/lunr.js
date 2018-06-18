suite('serialization', function () {
  setup(function () {
    var documents = [{
      id: 'a',
      title: 'Mr. Green kills Colonel Mustard',
      body: 'Mr. Green killed Colonel Mustard in the study with the candlestick. Mr. Green is not a very nice fellow.',
      people: ['Mr. Green', 'Colonel Mustard'],
      wordCount: 19,
    },{
      id: 'b',
      title: 'Plumb waters plant',
      body: 'Professor Plumb has a green plant in his study',
      people: ['Professor Plumb'],
      wordCount: 9
    },{
      id: 'c',
      title: 'Scarlett helps Professor',
      body: 'Miss Scarlett watered Professor Plumbs green plant while he was away from his office last week.',
      people: ['Miss Scarlett', 'Professor Plumb'],
      wordCount: 16
    }]

    this.idx = lunr(function () {
      this.ref('id')
      this.field('title')
      this.field('body')

      this.filterField('people')

      documents.forEach(function (document) {
        this.add(document)
      }, this)
    })

    this.serializedIdx = JSON.stringify(this.idx)
    this.loadedIdx = lunr.Index.load(JSON.parse(this.serializedIdx))
  })

  test('search', function () {
    var idxResults = this.idx.search('green', {
          people: 'Professor Plumb'
        }),
        serializedResults = this.loadedIdx.search('green', {
          people: 'Professor Plumb'
        })

    assert.deepEqual(idxResults, serializedResults)
  })
})
