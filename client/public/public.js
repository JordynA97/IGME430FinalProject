const ReviewPost = (props) => {
    return (
        // <form id="reviewForm" 
        // name="reviewForm" action="/public"
        // method="POST" className="reviewForm">

        //     <label htmlFor="reviewTitle">Title: </label>
        //     <input id="reviewTitle" type="text" name="reviewTitle" placeholder="Review Title"/>
        //     <label htmlFor="reviewRating">Rating: </label>
        //     <input id="reviewRating" type="text" name="reviewRating" placeholder="Review Rating"/>
        //     <label htmlFor="writingReview">Review: </label>
        //     <input id="writingReview" type="text" name="writtenReview" placeholder="Written Review"/>
        //     <input type="hidden" name="_csrf" value={props.csrf}/>
        //     <input className="reviewPostSubmit" type="submit" value="Make Review"/>

        // </form>

        <h3>hi</h3>
    );
};

const setup = () => {

    ReactDOM.render(
        <ReviewPost />,
        document.querySelector("#reviewPost")
    );
};

$(document).ready(setup());

// const handlePosts = (e) => {
//     e.preventDefault();

//     $("#gameMessage").animate({width:'hide'}, 350);

//     if($("#reviewTitle").val() == '' || $("#reviewRating").val() == '' || $("#writtenReview").val() == ''){
//         //handleError("Make sure all fields are filled!");
//         return false;
//     }

//     sendAjax('POST', $("#reviewForm").attr("action"), $("#reviewForm").serialize(), function(){
//         loadPosts();
//     });

//     return false;
// };

// const ReviewPost = (props) => {
//     return (
//         <form id="reviewForm" onSubmit={handlePosts}
//         name="reviewForm" action="/public"
//         method="POST" className="reviewForm">

//             <label htmlFor="reviewTitle">Title: </label>
//             <input id="reviewTitle" type="text" name="reviewTitle" placeholder="Review Title"/>
//             <label htmlFor="reviewRating">Rating: </label>
//             <input id="reviewRating" type="text" name="reviewRating" placeholder="Review Rating"/>
//             <label htmlFor="writingReview">Review: </label>
//             <input id="writingReview" type="text" name="writtenReview" placeholder="Written Review"/>
//             <input className="reviewPostSubmit" type="submit" value="Make Review"/>

//         </form>
//     );
// };

// const ReviewList = function(props){
//     if(props.posts.length === 0){
//         return(
//             <div className="reviewsListed">
//                 <h3 className="emptyReviews">No Posts Yet</h3>
//             </div>
//         );
//     }

//     const reviewPosts = props.reviews.map(function(review) {
//         return(
//             <div key={review._id} className="review">
//                 <h3 className="reviewGameTitle">Title: </h3>
//                 <h3 className="reviewGameRating">Rating: </h3>
//                 <h3 className="reviewDescription">Review: </h3>
//             </div>
//         );
//     });

//     return (
//     <div className="reviewList">{reviewPosts}</div>
//     );
// }

// const loadPosts = () => {
//     sendAjax('GET', '/getPosts', null, (data) => {
//         ReactDOM.render(
//             <ReviewList reviews={data.reviews} />, 
//             document.querySelector("#reviewList")
//         );
//     });
// };

// const setup = function(csrf){
//     ReactDOM.render(
//         <ReviewPost csrf={csrf}/>,
//         document.querySelector("#reviewPost")
//     );

//     ReactDOM.render(
//         <ReviewList reviews = {[]} />,
//         document.querySelector("reviewList")
//     );
    
//     loadPosts();
// };

// const getToken = () =>{
//     sendAjax('GET', '/getToken', null, (result) => {
//         setup(result.csrfToken);
//     });
// };

// $(document).ready(function() {
//     getToken();
// });