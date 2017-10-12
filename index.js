if (!process.argv[2]) throw new Error('No subtitle extension provided')
if (!process.argv[3]) throw new Error('No episode extension provided')
const fs = require('fs')
const files = fs.readdirSync('.')
const subtitlesExtension = process.argv[2]
const episodesExtension = process.argv[3]
const filterByExtension = (file, extension) =>{
  return file.indexOf(extension) >= 0
} 

const subtitles = files.filter(file => filterByExtension(file, subtitlesExtension))
const episodes = files.filter(file => filterByExtension(file, episodesExtension))

console.info(`Found ${subtitles.length} subtitles and ${episodes.length} episodes`)

if (subtitles.length !== episodes.length) {
  console.error('Number of subtitles and videos differ. Stoping to avoid damages. :D')
  process.exit(1)
}

subtitles.forEach((subtitle, index) => {
  const newSubtitleName = episodes[index].replace('mkv', 'srt')
  console.info(`Renaming ${subtitle} to ${newSubtitleName}`)
  fs.renameSync(subtitle, newSubtitleName)
})

console.info('Done! \o/')
