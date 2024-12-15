const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => {
        return sum + blog.likes }, 0)
    
return total
}

const favouriteBlog = (blogs) => {
    let fav = null
    if (blogs.length !== 0) {
        fav = blogs[0]

        for (let i = 0; i < blogs.length; i++) {
            if (fav.likes < blogs[i].likes) {
                fav = blogs[i]
            }
        }
    }
    return fav
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }