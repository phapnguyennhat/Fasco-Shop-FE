import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { createQueryString, SearchParams } from '@/lib/utils';

interface IProps {
	count: number;
	limit: number;
	queryParams: SearchParams;
}

export default function PaginationList({ queryParams, count, limit }: IProps) {
	const page = (queryParams['page'] as string) || '1';
	const numPage = Math.ceil(count / limit);
	const prevPage = Math.max(1, parseInt(page) - 1).toString();
    const nextPage = Math.min(numPage, parseInt(page) + 1).toString();
    
	return (
		<Pagination className=" mb-[30px]">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={`?${createQueryString(
							'page',
							prevPage,
							queryParams,
						)}`}
					/>
				</PaginationItem>

				{prevPage >= '1' && page !== '1' && (
					<PaginationItem>
						<PaginationLink
							href={`?${createQueryString(
								'page',
								prevPage,
								queryParams,
							)}`}
						>
							{prevPage}
						</PaginationLink>
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationLink
						isActive
						href={`?${createQueryString(
							'page',
							page,
							queryParams,
						)}`}
					>
						{page}
					</PaginationLink>
				</PaginationItem>

				{nextPage <= numPage.toString() &&
					page !== numPage.toString() && (
						<PaginationItem>
							<PaginationLink
								href={`?${createQueryString(
									'page',
									nextPage,
									queryParams,
								)}`}
							>
								{nextPage}
							</PaginationLink>
						</PaginationItem>
					)}

				{nextPage < numPage.toString() && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem>
                    <PaginationNext
						href={`?${createQueryString(
							'page',
							nextPage,
							queryParams,
						)}`}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
