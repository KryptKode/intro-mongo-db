const Project = require('../project')
const Org = require('../org')
const mongoose = require('mongoose')

describe('Org model', () => {
  test('removes projects when org is remove', async () => {
    const org = await Org.create({ name: 'org' })
    await Project.create([
      { name: 'project1eewe', org: org.id },
      { name: 'projectrerer', org: org.id }
    ])

    await org.remove()
    const matchedProjects = await Project.find({ org: org._id }).exec()
    expect(matchedProjects).toHaveLength(0)
  })
})
