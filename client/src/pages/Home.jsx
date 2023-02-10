    import React, { useState, useEffect } from 'react';

    import { Loader, Card, FormField, Hero, } from '../components';


    const RenderCards = ({ data, title, showMore, setShowMore }) => {
        const [limit, setLimit] = useState(5);
      
        const handleShowMore = () => {
          setLimit(limit + 5);
          setShowMore(true);
        };
      
        if (data?.length > 0) {
          return (
            <>
              {data.slice(0, limit).map((post) => <Card key={post._id} {...post} />)}
              {limit < data.length && (
                <button
                  className="bg-[#2faaea] text-white my-6 mx-auto sm:px-8 px-4 py-4 rounded"
                  onClick={handleShowMore}
                >
                  Show More
                </button>
              )}
            </>
          );
        }
      
        return (
          <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
            {title}
          </h2>
        );
      };


    const Home = () => {
        const [loading, setLoading] = useState(false);
        const [allPosts, setAllPosts] = useState(null);


        const [searchText, setSearchText] = useState('');
        const [searchedResults, setSearchedResults] = useState(null);
        const [searchTimeout, setSearchTimeout] = useState(null);

        

        

        useEffect(() => {
            const fetchPosts = async () => {
                setLoading(true);

                try {
                    const response = await fetch('https://server-ai-generation-image.vercel.app/api/v1/post', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })

                    if (response.ok) {
                        const result = await response.json();

                        setAllPosts(result.data.reverse());
                    }
                    
                } catch (error) {
                    alert(error)
                } finally {
                    setLoading(false)
                }
            }

            fetchPosts();
        }, []);

        const handleSearchChange = (e) => {
            clearTimeout(searchTimeout);

            setSearchText(e.target.value);

            setSearchTimeout(
                setTimeout(() => {
                    const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        
                    setSearchedResults(searchResults);
                }, 500)
            );
        }

        return (

            <section className="max-w-7xl mx-auto">
                <Hero />
                

                
                <div className='border-4 border-[#000050] mt-5 rounded-md px-5 p-5'>
                    
                    <div className='border-b-2  border-[#185ed5]'>

                        <h1 className="font-extrabold text-[#051067] text-[32px] ">
                            The Community Showcase
                        </h1>

                        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
                            Browse through a collection of imaginative and visually
                            stunning images generated by DALL-E AI
                        </p> 

                        
                    </div>
                    

                    <div className='mt-12'>
                        <FormField
                            labelName='Seach posts'
                            type='text'
                            name='text'
                            placeholder='Search posts'
                            value={searchText}
                            handleChange={handleSearchChange}
                        />       
                    </div>

                </div>

                

                <div className='mt-5'>
                    {loading ? (
                        <div className='flex justify-center items-center'>
                            <Loader />
                        </div>
                    ) : (
                        
                            <>
                                {searchText && (
                                    <h2 className='font-medium text-[666e75] text-xl mb-3'>
                                        Showing results for: <span className='text-[#222328]'>
                                            {searchText}
                                        </span>
                                    </h2>
                                )}
                            </>
                    )}

                    <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2
                                    grid-cols-1 gap-3'>
                        
                        {searchText ? (
                            <RenderCards
                                data={searchedResults}
                                title='No search results found'
                            />
                        ) : (
                                <RenderCards
                                    data={allPosts}
                                    title='No posts found'
                                />
                        )}

                    </div>
                </div>

               
            </section>

        )
    }
    

    export default Home