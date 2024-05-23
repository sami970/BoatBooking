import {Link, useLocation} from "react-router-dom";

export default function AccountNav() {
  const {pathname} = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
  }
  function linkClasses (type=null) {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
    if (type === subpage) {
      classes += ' bg-primary text-white';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses('profile')} to={'/account'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        My profile
      </Link>
      <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        My bookings
      </Link>
      <Link className={linkClasses('boats')} to={'/account/boats'}>


        <svg fill="#000000" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.998 511.998" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M510.652,230.062c-1.357-2.116-3.567-3.524-6.05-3.857l-128-17.067c-4.617-0.606-8.96,2.662-9.591,7.33 c-0.631,4.668,2.662,8.969,7.33,9.591l18.193,2.423v21.675l-42.667-4.574v-42.47l15.633-23.45c1.707-2.56,1.903-5.837,0.521-8.576 c-1.391-2.748-4.147-4.54-7.219-4.685l-179.2-8.533c-2.876-0.026-5.666,1.212-7.347,3.567l-42.667,59.733 c-0.171,0.239-0.205,0.529-0.35,0.777L9.438,209.113c-2.423-0.256-4.813,0.521-6.613,2.133C1.033,212.868,0,215.172,0,217.595 c0,75.281,88.047,136.533,196.267,136.533h273.067c3.746,0,7.057-2.441,8.158-6.025l34.133-110.933 C512.358,234.773,512,232.17,510.652,230.062z M409.6,251.728v-20.975l34.133,4.548v20.335l-34.185-3.661 C409.549,251.891,409.6,251.814,409.6,251.728z M264.047,178.982l78.899,3.755l-8.713,13.056c-0.93,1.399-1.434,3.055-1.434,4.736 v43.23l-76.834-8.235L264.047,178.982z M183.441,175.142l63.479,3.021l-7.902,55.287c-0.009,0.085,0.026,0.171,0.017,0.256 l-90.505-9.694L183.441,175.142z M463.027,337.062H196.267c-75.418,0-140.015-31.258-166.417-75.332l441.267,49.033 L463.027,337.062z M476.228,294.165L21.564,243.647c-1.809-5.385-3.26-10.863-3.925-16.486l463.915,49.698L476.228,294.165z M486.665,260.245l-25.865-2.773V237.58l31.548,4.207L486.665,260.245z"></path> </g> </g> </g></svg>
        My boats
      </Link>
    </nav>
  );
}