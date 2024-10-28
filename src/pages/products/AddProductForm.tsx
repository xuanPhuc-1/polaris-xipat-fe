import React, { useState } from "react";
import { Modal, TextField, DropZone, Thumbnail, BlockStack } from "@shopify/polaris";

interface AddProductModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (productData: any) => void;
}

interface File extends Blob {
	readonly lastModified: number;
	readonly name: string;
}

const AddProductModal = ({ isOpen, onClose, onSubmit }: AddProductModalProps) => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [files, setFiles] = useState<File[]>([]);
	const [buyFrom, setBuyFrom] = useState("");
	const [buyTo, setBuyTo] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleDropZoneDrop = (acceptedFiles: File[]) => {
		const imageFiles = acceptedFiles.filter(file => file.type.startsWith("image/"));
		setFiles(imageFiles);
	};

	const validateFields = () => {
		let newErrors: { [key: string]: string } = {};

		if (!title) newErrors.title = "Title is required";
		if (!price || parseFloat(price) <= 0) newErrors.price = "Price must be a positive number";
		if (!buyFrom) newErrors.buyFrom = "Buy from is required";
		if (!buyTo) newErrors.buyTo = "Buy to is required";
		if (parseFloat(buyTo) <= parseFloat(buyFrom)) {
			newErrors.buyTo = "Buy to must be greater than Buy from";
		}
		if (!startDate) newErrors.startDate = "Start date is required";
		if (!endDate) newErrors.endDate = "End date is required";
		if (endDate && startDate && new Date(endDate) <= new Date(startDate)) {
			newErrors.endDate = "End date must be after Start date";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSave = () => {
		if (validateFields()) {
			const productData = {
				title,
				price,
				description,
				image: files,
				buyFrom,
				buyTo,
				startDate,
				endDate
			};
			console.log("Form Submitted:", productData);
			onSubmit(productData);
			onClose();
		}
	};

	const fileUpload = !files.length && <DropZone.FileUpload />;
	const uploadedFiles = files.length > 0 && (
		<BlockStack>
			{files.map((file, index) => (
				<Thumbnail key={index} size="small" alt={file.name} source={window.URL.createObjectURL(file)} />
			))}
		</BlockStack>
	);

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			title="Add product"
			primaryAction={{
				content: "Save",
				onAction: handleSave
			}}
			secondaryActions={[
				{
					content: "Cancel",
					onAction: onClose
				}
			]}
		>
			<Modal.Section>
				<BlockStack>
					<TextField
						label="Title"
						value={title}
						onChange={value => setTitle(value)}
						autoComplete="off"
						error={errors.title}
						requiredIndicator
					/>
					<TextField
						label="Price"
						type="number"
						value={price}
						onChange={value => setPrice(value)}
						prefix="$"
						autoComplete="off"
						error={errors.price}
						requiredIndicator
					/>
					<TextField
						label="Buy from"
						type="number"
						value={buyFrom}
						onChange={value => setBuyFrom(value)}
						autoComplete="off"
						error={errors.buyFrom}
						requiredIndicator
					/>
					<TextField
						label="Buy to"
						type="number"
						value={buyTo}
						onChange={value => setBuyTo(value)}
						autoComplete="off"
						error={errors.buyTo}
						requiredIndicator
					/>
					<TextField
						label="Start date"
						type="date"
						value={startDate}
						onChange={value => setStartDate(value)}
						autoComplete="off"
						error={errors.startDate}
						requiredIndicator
					/>
					<TextField
						label="End date"
						type="date"
						value={endDate}
						onChange={value => setEndDate(value)}
						autoComplete="off"
						error={errors.endDate}
						requiredIndicator
					/>
					<DropZone accept="image/*" type="image" onDrop={handleDropZoneDrop} label="Image">
						{uploadedFiles}
						{fileUpload}
					</DropZone>
					<TextField
						label="Description"
						value={description}
						onChange={value => setDescription(value)}
						multiline={4}
						autoComplete="off"
					/>
				</BlockStack>
			</Modal.Section>
		</Modal>
	);
};

export default AddProductModal;
