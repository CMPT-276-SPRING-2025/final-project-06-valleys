import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";

export function CommentsSection({ comments, votes }) {
  // Format date from Unix timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="mt-6">
      <details className="mb-2">
        <summary className="cursor-pointer text-lg font-semibold">
          Community Comments ({comments.length})
        </summary>
        <div className="mt-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Card key={comment.id} className="overflow-hidden py-0">
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-500">
                        Posted on {formatDate(comment.attributes.date)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-sm">{comment.attributes.votes.positive}</span>
                        </span>
                        <span className="flex items-center">
                          <ThumbsDown className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-sm">{comment.attributes.votes.negative}</span>
                        </span>
                        {comment.attributes.votes.abuse > 0 && (
                          <span className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
                            <span className="text-sm">{comment.attributes.votes.abuse}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      {comment.attributes.html ? (
                        <div dangerouslySetInnerHTML={{ __html: comment.attributes.html }} />
                      ) : (
                        <p>{comment.attributes.text}</p>
                      )}
                    </div>
                    {comment.attributes.tags && comment.attributes.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {comment.attributes.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No comments available for this URL.</p>
          )}
        </div>
      </details>
      
      {votes && votes.length > 0 && (
        <details className="mb-2 mt-4">
          <summary className="cursor-pointer text-lg font-semibold">
            Community Votes ({votes.length})
          </summary>
          <div className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <ThumbsUp className="h-6 w-6 mx-auto text-green-500" />
                    <p className="mt-1 text-lg font-semibold">
                      {votes.filter(v => v.attributes?.verdict === "harmless").length}
                    </p>
                    <p className="text-sm text-gray-500">Harmless</p>
                  </div>
                  <div>
                    <ThumbsDown className="h-6 w-6 mx-auto text-red-500" />
                    <p className="mt-1 text-lg font-semibold">
                      {votes.filter(v => v.attributes?.verdict === "malicious").length}
                    </p>
                    <p className="text-sm text-gray-500">Malicious</p>
                  </div>
                  <div>
                    <AlertTriangle className="h-6 w-6 mx-auto text-yellow-500" />
                    <p className="mt-1 text-lg font-semibold">
                      {votes.filter(v => v.attributes?.verdict === "suspicious").length}
                    </p>
                    <p className="text-sm text-gray-500">Suspicious</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </details>
      )}
    </div>
  );
}