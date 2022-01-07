//data imported from MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const status_codes=[
    {
        value:"100",
        meaning:"Continue",
        description:"This interim response indicates that the client should continue the request or ignore the response if the request is already finished."
    },
    {
        value:"101",
        meaning:"Switching Protocols",
        description:"This code is sent in response to an Upgrade request header from the client and indicates the protocol the server is switching to."
    },
    {
        value:"102",
        meaning:"Processing",
        description:"This code indicates that the server has received and is processing the request, but no response is available yet."
    },
    {
        value:"103",
        meaning:"Early Hints",
        description:"This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response."

    },
    {
        value:"200",
        meaning:"OK",
        description:"The request succeeded. The result meaning of \"success\" depends on the HTTP method"

    },
    {
        value:"201",
        meaning:"Created",
        description:"The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests."

    },
    {
        value:"202",
        meaning:"Accepted",
        description:"The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing."

    },
    {
        value:"203",
        meaning:"Non-Authoritative Information",
        description:"This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status."

    },
    {
        value:"204",
        meaning:"No Content",
        description:"There is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones."

    },
    {
        value:"205",
        meaning:"Reset Content",
        description:"Tells the user agent to reset the document which sent this request."

    },
    {
        value:"206",
        meaning:"Partial Content",
        description:"This response code is used when the Range header is sent from the client to request only part of a resource."

    },
    {
        value:"207",
        meaning:"Multi-Status",
        description:"Conveys information about multiple resources, for situations where multiple status codes might be appropriate."

    },
     {
        value:"208",
        meaning:"Already Reported",
        description:"Used inside a <dav:propstat> response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection."

    },
    {
        value:"226",
        meaning:"IM Used",
        description:"The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance."

    },
    {
        value:"300",
        meaning:"Multiple Choice",
        description:"The request has more than one possible response. The user agent or user should choose one of them. (There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.)"

    },
    {
        value:"301",
        meaning:"Moved Permanently",
        description:"The URL of the requested resource has been changed permanently. The new URL is given in the response."

    },
    {
        value:"302",
        meaning:"Found",
        description:"This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests."

    },
    {
        value:"303",
        meaning:"See Other",
        description:"The server sent this response to direct the client to get the requested resource at another URI with a GET request."
 
    },
    {
        value:"304",
        meaning:"Not Modified",
        description:"This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response."
 
    },
    {
        value:"305",
        meaning:"Use Proxy",
        description:"Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy."
 
    },
    {
        value:"306",
        meaning:"unused",
        description:"This response code is no longer used; it is just reserved. It was used in a previous version of the HTTP/1.1 specification."
 
    }
    ,{
        value:"307",
        meaning:"Temporary Redirect",
        description:"The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request."
 
    },
    {
        value:"308",
        meaning:"Permanent Redirect",
        description:"This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request."
 
    }
    

]
export default status_codes;